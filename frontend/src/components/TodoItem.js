import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)} // Sửa đổi ID ở đây
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button> {/* Sửa đổi ID ở đây */}
    </div>
  );
}

export default TodoItem;
