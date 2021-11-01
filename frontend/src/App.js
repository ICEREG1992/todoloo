import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const backendAddress = 'http://localhost:5000/';
const localStorageKey = "todoloo.uid"

function App() {
  const [todos, setTodos] = useState([]);
  const uid = useRef(null);
  
  useEffect(() => {
    uid.current = localStorage.getItem(localStorageKey);
    if (!uid.current) {
      // this user doesn't have an id yet, generate a uid
      uid.current = uuidv4();
      localStorage.setItem(localStorageKey, uid.current);
    }
    // now, get data
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }
    fetch(backendAddress + 'user/' + uid.current, options).then(res => res.json()).then(out => setTodos(out));
  }, [])

  // save todos to api
  useEffect(() => {
    console.log(todos);
    uid.current = localStorage.getItem(localStorageKey);
    if (!uid.current) {
      // this user doesn't have a spot yet, generate a uid
      uid.current = uuidv4();
      localStorage.setItem(localStorageKey, uid.current);
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(todos)
    };
    fetch(backendAddress + 'user/' + uid.current, options);
  }, [todos])

  function addTodo(e) {
    // add new todo to list
    const temp_id = uuidv4();
    setTodos(prev => {
      console.log(prev);
      return [...prev, { id: temp_id, text: '', done: false }];
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

  function updateText(text, id) {
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    todo.text = text;
    setTodos(temp);
  }

  function move(up, id) {
    const temp = [...todos]; // make a copy
    const todo = temp.find(todo => todo.id===id);
    var ind = temp.indexOf(todo);
    if (up && ind > 0) {
      var x = temp[ind-1];
      temp[ind-1] = temp[ind];
      temp[ind] = x;
    } else if (!up && ind < (todos.length - 1)) {
      x = temp[ind+1];
      temp[ind+1] = temp[ind];
      temp[ind] = x
    }
    setTodos(temp)
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function percentage() {
    if (todos.length) {
      return (todos.filter(todo => todo.done).length / todos.length) * 100 + "%";
    } else {
      return "100%";
    }
  }

  return (
    <>
      <div className="header">
        <a href="./">todoloo</a>
      </div>
      <div className="app">
        <div className="main">
          <div className="menu">
            <div className="list">
              <TodoList todos={todos} doneTodo={doneTodo} setTodos={setTodos} updateText={updateText} move={move} deleteTodo={deleteTodo} />
            </div>
            <div className="manage">
              <button onClick={addTodo}>new todo</button>
              <button onClick={clearDone}>clear finished</button>
              <button onClick={clearAll}>clear all</button>
            </div>
          </div>
          <div className="progressbar">
            <div className="progress" style={{width: percentage()}}></div>
          </div>
        </div>
        <div className="credits">
          <span className="made-by">made by <a href="https://www.github.com/icereg1992">icereg1992</a> on github</span>
        </div>
      </div>
    </>
  );
}

export default App;
