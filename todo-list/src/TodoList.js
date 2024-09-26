import React, { useState } from 'react';

function TodoList({ todos, onRemove, onComplete, onEdit, onSave }) {
  const [editTexts, setEditTexts] = useState({}); // Store edit text for each todo
  const [error, setError] = useState({}); // Store error state for each todo

  const handleEditChange = (id, value) => {
    setEditTexts((prev) => ({ ...prev, [id]: value })); // Update specific todo's edit text
    setError((prev) => ({ ...prev, [id]: false })); // Clear error for that specific todo
  };

  const handleSaveClick = (id, todoText) => {
    const currentEditText = editTexts[id] || ''; // Get the current text for the todo
    if (currentEditText.trim() === '') {
      setError((prev) => ({ ...prev, [id]: true })); // Show error if the text is empty
    } else {
      onSave(id, currentEditText);
      setEditTexts((prev) => ({ ...prev, [id]: '' })); // Reset text for that specific todo
      setError((prev) => ({ ...prev, [id]: false })); // Clear error for that specific todo
    }
  };

  return (
    <div className="todo-list-container">
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item" style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
          {todo.isEditing ? (
            <>
              <input
                type="text"
                value={editTexts[todo.id] === undefined ? todo.text : editTexts[todo.id]} // Handle per-todo text
                onChange={(e) => handleEditChange(todo.id, e.target.value)} // Track per-todo changes
              />
              <button onClick={() => handleSaveClick(todo.id, todo.text)}>Save</button>
              {error[todo.id] && <p style={{ color: 'red' }}>Todo text cannot be empty!</p>} {/* Error message */}
            </>
          ) : (
            <>
            <span
                  style={{
                    textDecoration: todo.isComplete ? 'line-through' : 'none', // Apply strike-through if isComplete
                  }}
            >
              {todo.text}
            </span>
              <button onClick={() => onComplete(todo.id)}>
                {todo.isComplete ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => onEdit(todo.id)} disabled={todo.isComplete}>
                Edit
              </button>
              <button onClick={() => onRemove(todo.id)} disabled={todo.isComplete}>
                Remove
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TodoList;
