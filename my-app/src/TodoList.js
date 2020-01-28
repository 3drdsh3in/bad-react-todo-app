import React from 'react';
import Todo from './Todo';

export default function TodoList({ todoList, toggleTodo }) {
    return (
        // The key below ensures that a single to change to the todo array won't result
        // in the entire todo array being re-rendedered by only rerendering items with unique ids
        // A unique key denotes a new item that needs to be rerendered.
        todoList.map(todo => { return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} /> })
    )
}
