import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, doneTodo, updateText, move, deleteTodo }) {
    if (todos.length) {
        return (
            todos.map(todo => {
                return <Todo key={todo.id} todo={todo} doneTodo={doneTodo} updateText={updateText} move={move} deleteTodo={deleteTodo}/>
            })
        )
    } else {
        return (
            <div className="all-done">nothing left 😊</div>
        )
    }
    
    
}