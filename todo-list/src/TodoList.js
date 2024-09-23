import React, { useState } from 'react';

function TodoList({ todos, onRemove, onComplete, onEdit, onSave }) {
  const [editText, setEditText] = useState('');

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
          {todo.isEditing ? (
            <>
              <input
                type="text"
                value={editText || todo.text}
                onChange={handleEditChange}
              />
              <button onClick={() => onSave(todo.id, editText)}>Save</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button
                onClick={() => onComplete(todo.id)}
                disabled={todo.isComplete || todo.isEditing}
              >
                Complete
              </button>
              <button
                onClick={() => onEdit(todo.id)}
                disabled={todo.isComplete || todo.isEditing}
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
