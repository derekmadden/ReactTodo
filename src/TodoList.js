import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, markCompleted }) {
    return (
        todos.map(todo => {
            // console.log("id = " + todo.description);
            return <Todo key={todo.id} toggleTodo={toggleTodo} markCompleted={markCompleted} todo={todo} />
        })
    )
}
