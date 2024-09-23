import React, { useState } from 'react';

function TodoList({ todos, onRemove, onComplete, onEdit, onSave }) {
  const [editText, setEditText] = useState('');
  const [error, setError] = useState(false); // State to track error message

  const handleEditChange = (e) => {
    setEditText(e.target.value);
    setError(false); // Clear error message when typing
  };

  const handleSaveClick = (id, todoText) => {
    if (editText.trim() === '') {
      setError(true); // Show error if the text is empty
    } else {
      onSave(id, editText || todoText);
      setEditText(''); // Reset edit text after save
      setError(false); // Clear error
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item" style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
          {todo.isEditing ? (
            <>
              <input
                type="text"
                value={editText === '' && !error ? todo.text : editText} // Allow clearing the text
                onChange={handleEditChange}
              />
              <button onClick={() => handleSaveClick(todo.id, todo.text)}>Save</button>
              {error && <p style={{ color: 'red' }}>Todo text cannot be empty!</p>} {/* Error message */}
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button
                onClick={() => onComplete(todo.id)}
              >
                {todo.isComplete ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => onEdit(todo.id)}
                disabled={todo.isComplete}
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(todo.id)}
                disabled={todo.isComplete}
              >
                Remove
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
