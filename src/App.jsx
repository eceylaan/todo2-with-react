import { useState } from "react";
import "./App.css";

let id = 0;

// function id(){
// id++
// return id;
// }

const generateId = () => ++id; //sagina arti arti koyarsak 0'dan basliyo bu sekilde 1'den basliyo

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  function appendTodo(task) {
    const todoObj = {
      id: generateId(),
      task,
      checked: false,
    };
    console.log(todoObj);

    setTodos([...todos, todoObj]);
    setAllTodos([...todos, todoObj]);
  }

  function deleteTodo(id) {
    //magic here
    const updatedTodos = todos.filter((x) => x.id !== id);
    setTodos(updatedTodos);
    setAllTodos(updatedTodos);
  }

  function updateTodo(id, newTask) {
    const todo = todos.find((x) => x.id === id);
    todo.task = newTask;
    setTodos([...todos]);
    setAllTodos([...todos]);
  }
  function handleCheck(value, id) {
    const index = todos.findIndex((x) => x.id === id);
    console.log(value);
    todos[index].checked = value;
    console.log(todos);
    setTodos([...todos]);
    setAllTodos([...todos]);
  }
  return (
    <div className="todoApp">
      <header>
        <h1>T O D O</h1>
        <button onClick={() => toggleDarkMode()} className="dark-btn">
          <i className={!darkMode ? "fa-solid fa-moon xl" : "fa-regular fa-sun xl"}></i>
        </button>
      </header>
      <TodoForm appendTodo={appendTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        handleCheck={handleCheck}
        setTodos={setTodos}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
    </div>
  );
}

function TodoList({ todos, deleteTodo, updateTodo, handleCheck, setTodos, allTodos, setAllTodos }) {
  function handleClear() {
    setTodos(todos.filter((x) => x.checked === false));
    setAllTodos(todos.filter((x) => x.checked === false));
  }

  function handleCompleted() {
    const completedTodos = allTodos.filter((x) => x.checked === true);
    setTodos(completedTodos);
  }

  function handleActive() {
    const activeTodos = allTodos.filter((x) => x.checked === false);
    setTodos(activeTodos);
  }

  function handleAll() {
    setTodos(allTodos);
  }

  return (
    <>
      <ul className="todoList">
        {todos.map((x) => (
          <TodoItem
            key={x.id}
            id={x.id}
            task={x.task}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            checked={x.checked}
            handleCheck={handleCheck}
          />
        ))}
      </ul>
      <div className="all-btns">
        <p>{todos.length} items left</p>
        <div className="btns">
          <button onClick={() => handleAll()}>
            <strong>All</strong>
          </button>
          <button onClick={() => handleActive()}>
            <strong>Active</strong>
          </button>
          <button onClick={() => handleCompleted()}>
            <strong>Completed</strong>
          </button>
        </div>
        <button className="clear-btn" onClick={() => handleClear()}>
          Clear Completed
        </button>
      </div>
    </>
  );
}

function TodoItem({ task, id, deleteTodo, updateTodo, checked, handleCheck }) {
  //key prop olarak kullanilamiyo o yuzden key degil id verdik

  const [isEdit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState(task);

  return (
    <>
      <div className="item-container">
        <div className="flex-row">
          <input onChange={(e) => handleCheck(e.target.checked, id)} type="checkbox" name={`radio-${id}`} checked={checked} />
          <li className={`${!isEdit ? "readOnly" : ""} ${checked ? "checked" : ""}`}>
            <input
              type="text"
              onDoubleClick={() => setEdit(true)}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              readOnly={!isEdit ? "readOnly" : ""}
            />
            {isEdit ? (
              <>
                <button
                  onClick={() => {
                    setEdit(false);
                    updateTodo(id, newTask);
                  }}
                >
                  {" "}
                  ✔️
                </button>
                <button
                  onClick={() => {
                    setNewTask(task);
                    setEdit(false);
                  }}
                >
                  X
                </button>
              </>
            ) : (
              <button className="delete-todo-btn" onClick={() => deleteTodo(id)}></button>
            )}
          </li>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
}

function TodoForm({ appendTodo }) {
  function handleSubmit(e) {
    e.preventDefault();

    appendTodo(e.target["task"].value);
    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="task" required type="text" placeholder="Create a new todo..." />
      </form>
    </>
  );
}
