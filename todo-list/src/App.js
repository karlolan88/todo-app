import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, isComplete: false, isEditing: false }]);
      setTodoInput('');
    }
  };

  const handleRemove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo))
    );
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo))
    );
  };

  const handleSave = (id, newText) => {
    if (newText.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
        )
      );
    } else {
      alert('Todo text cannot be empty!');
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length === 0 ? (
        <p>No todos listed. Add an activity to get started!</p>
      ) : (
        <TodoList
          todos={todos}
          onRemove={handleRemove}
          onComplete={handleComplete}
          onEdit={handleEdit}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
