import React, { useState } from 'react';
import './App.scss'

function App() {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodo] = useState([])

  //Creates todos and clears input
  const handleInput = e => {
    setTodoValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();    
    const todo = {
      value: todoValue,
      done: false,
      edit: false 
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
  }

  //Mark todos as done
  const handleDone = e => {
    const { id } = e.target.parentElement.parentElement;
    todos[id].done = !todos[id].done
    setTodo([...todos])
  }

  //edit the task
  const handleEdit = e => {
    const { id } = e.target.parentElement.parentElement;
    todos[id].edit = true
    setTodo([...todos])
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { id } = e.target.parentElement.parentElement;
    const newValue = document.getElementById(`edit-${e.target.parentElement.parentElement.id}`).value.trim();
    todos[id].edit = false
    todos[id].value = newValue === '' ? todos[id].value : newValue;
    setTodo([...todos])
  }

  return (
    <div className="todo-list">
      <h1 className="head">To-Do List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" id="todoValue" onChange={handleInput}/>
        <button type="submit">ADD</button>
      </form>
      <div className="todos">
        {
          todos && todos.map((todo, i) => (
            <div className={todo.edit ? 'todo-block edit' : 'todo-block'} key={i} id={i}>

            <div className="todo-block__to-edit">
                <button className={todo.done ? 'done' : 'not-done'} id={`item-${i}`} onClick={handleDone}>{todo.value}</button>
                <button className="edit-todo" onClick={handleEdit}>edit</button>   
              </div>

              <form className="todo-block__to-save">
                <input type="text" name="todo-item" id={`edit-${i}`} />
                <button className="edit-todo" onClick={handleChange}>save</button>   
              </form>

              <button className="delete-todo" onClick={handleDelete}>x</button>              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;