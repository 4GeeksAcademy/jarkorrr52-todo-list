import React, { useState } from 'react';
import TodoItem from './TodoItem';
import '../../styles/TodoList.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>To do List</h1>
      <div className="input-container">
        <input className='input-text'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          placeholder="Nueva tarea"
        />
      </div>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (
          tasks.map((task, index) => (
            <TodoItem key={index} task={task} onDelete={() => handleDeleteTask(index)} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;

