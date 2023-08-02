import React from 'react';
import  '../../styles/TodoList.css'
const TodoItem = ({ task, onDelete }) => {
  return (
    <li className="task-item">
      {task}
      <button className="delete-button" onClick={onDelete}>
      </button>
    </li>
  );
};

export default TodoItem;

