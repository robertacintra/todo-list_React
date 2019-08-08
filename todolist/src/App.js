import React, { useState } from 'react';
import './App.scss'

function App() {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodo] = useState([])
  const [edit, setEdit] = useState(false)

  //Creates todos and clears input
  const handleInput = e => {
    setTodoValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();    
    const todo = {
      value: todoValue,
      done: false
    }
    
    if(!todoValue) return;
    setTodo([...todos, todo]);
    document.getElementById('todoValue').value = ''
  }

  //Remove todos
  const handleDelete = e => {
    const { id } = e.target.parentElement;
    todos.splice(id, 1)
    setTodo([...todos]);
    setEdit(false);
  }

  //Mark todos as done
  const handleDone = e => {
    const { id } = e.target.parentElement;
    todos[id].done = !todos[id].done
    setTodo([...todos])
    setEdit(false);
  }

  //edit the task
  const handleEdit = e => {
    setEdit(true);

    setTodo 
  }
  return (
    <div className="todo-list">
      <h1 className="head">To-Do List</h1>
      <div className="todos">
        {
          todos && todos.map((todo, i) => (
            <div className="todo-block" key={todo.value} id={i}>
              <button className={todo.done ? 'done' : 'not-done'} onClick={handleDone}>{todo.value}</button>
              
              <button className="edit-todo" onClick={handleEdit}>edit</button>   

              <button className="delete-todo" onClick={handleDelete}>x</button>              
            </div>
          ))
        }
      </div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" id="todoValue" onChange={handleInput}/>
        <button type="submit">ADD</button>
      </form>
    </div>
  )
}

export default App;