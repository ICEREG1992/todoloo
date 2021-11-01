import React, { useRef, useState } from 'react';

export default function TodoText({ todo, updateText, deleteTodo }) {
    const ref = useRef();
    const [editing, setEditing] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        setEditing(false);
        if (ref.current.value === "") {
            deleteTodo(todo.id)
        }
    }

    function startEdit(e) {
        setEditing(true);
    }

    function endEdit(e) {
        setEditing(false);
    }

    function handleUpdate() {
        updateText(ref.current.value, todo.id);
    }

    if (editing) {
        return (
            <form onSubmit={handleSubmit} onBlur={endEdit}>
                <input autoFocus type='Text' ref={ref} onChange={handleUpdate} value={todo.text}></input>
            </form>
        )
    } else {
        return <span onClick={startEdit}>{todo.text}</span>
    }
}