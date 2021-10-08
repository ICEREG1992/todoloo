import './App.css';
import React, { useState } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  
  function addTodo(e) {
    // add new todo to list
    const temp_id = uuidv4();
    setTodos(prev => {
      return [...prev, { id: temp_id, text: '', done: false, editing: true}];
    });
    // todo starts in edit mode to user can fill in text
  }

  function clearDone(e) {
    const temp = todos.filter(todo => todo.done !== true);
    setTodos(temp);
  }

  function clearAll(e) {
    const temp = [];
    setTodos(temp);
  }

  function doneTodo(id) {
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    todo.done = !todo.done;
    setTodos(temp);
  }

  function toggleEditing(id) {
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    todo.editing = !todo.editing;
    setTodos(temp);
  }

  function updateText(ref, id) {
    const newText = ref.current.value;
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    todo.text = newText;
    setTodos(temp);
  }

  function move(up, id) {
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    if (up) {
      arrayMove(temp, temp.indexOf(todo), temp.indexOf(todo)-1)
    } else if (temp.indexOf(todo) < temp.length) {
      arrayMove(temp, temp.indexOf(todo), temp.indexOf(todo)+1)
    } else {
      // do nothing
    }
    setTodos(temp)
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  return (
    <>
      <div className="header">
        <a href="./">todoloo</a>
      </div>
      <div className="app">
        <div className="menu">
          <div className="list">
            <TodoList todos={todos} doneTodo={doneTodo} toggleEditing={toggleEditing} updateText={updateText} move={move} deleteTodo={deleteTodo} />
          </div>
          <div className="manage">
            <button onClick={addTodo}>new todo</button>
            <button onClick={clearDone}>clear finished</button>
            <button onClick={clearAll}>clear all</button>
          </div>
        </div>
        <div className="progressbar">
          <div className="progress" style={{width: (todos.filter(todo => todo.done).length / todos.length) * 100 + "%"}}></div>
        </div>
        <span>made by <a href="https://www.github.com/icereg1992">icereg1992</a> on github</span>
      </div>
    </>
  );
}

export default App;
