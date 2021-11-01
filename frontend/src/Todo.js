import React from 'react';
import TodoText from './TodoText';

export default function Todo({ todo, doneTodo, updateText, move, deleteTodo }) {
    function handleDone() {
        doneTodo(todo.id);
    }

    function moveUp(e) {
        move(true, todo.id)
    }
    
    function moveDown(e) {
        move(false, todo.id)
    }
    
    function handleDelete(e) {
        deleteTodo(todo.id)
    }
    
    return (
        <div className={ todo.done ? "todo checked" : "todo" }>
            <input type="checkbox" checked={todo.done} onChange={handleDone}></input>
            <TodoText todo={todo} updateText={updateText} deleteTodo={deleteTodo}/>
            <div className="buttons">
                <button onClick={moveUp}>Ʌ</button>
                <button onClick={moveDown}>V</button>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    ) 

}