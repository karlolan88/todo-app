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
      todos.map(todo => (todo.id === id ? { ...todo, isComplete: true } : todo))
    );
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo))
    );
  };

  const handleSave = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>

      {todos.length === 0 ? (
        <p>No todos available. Add a todo to get started!</p>
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
