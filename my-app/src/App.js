import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList.js';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // Declares a new 
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

  // Only Runs whenever anything within '[]' changes which is only when the page loads [apparently]
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Whenever anything within '[todos]' changes or page reloaded new localStorage item will be set.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    // New todos is a copy of the declared todos state item. Use '...' to get copies in reactJS.
    const newTodos = [...todos];
    // Find & save a reference of the todo item with the same id as the id that has been passed into the toggleTodo function.
    const todo = newTodos.find(todo => todo.id === id)
    // Set the complete attribute of the todo item to its opposite value
    todo.complete = !todo.complete;
    // Reset the Todos item to the updated copy.
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    // If field is empty:
    if (name === '') return
    // Else:
    // NOTE:
    // setTodos([]) --- would clear the todos array.

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    // Get all the incomplete todo items [Which all have complete: false]
    // Since .filter(lst) method only returns items in the list that return true i.e the todo's complete attribute
    // must have a true value to be filtered out/no accepted.
    const newTodos = todos.filter(todo => !todo.complete)
    // Reset the Todos to the items which have not been completed.
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
