import React, { useRef } from 'react';

export default function TodoText({ todo, toggleEditing, updateText }) {
    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        toggleEditing(todo.id);
    }

    function handleEdit(e) {
        toggleEditing(todo.id);
    }

    function handleUpdate() {
        updateText(ref, todo.id);
    }

    if (todo.editing) {
        return (
            <form onSubmit={handleSubmit}>
                <input autoFocus type='Text' ref={ref} onChange={handleUpdate} value={todo.text}></input>
            </form>
        )
    } else {
        return <span onClick={handleEdit}>{todo.text}</span>
    }
}