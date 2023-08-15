import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import '../../styles/TodoList.css';

const url = "https://playground.4geeks.com/apis/fake/todos/user/jarkor52";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskData = { label: newTask, done: false };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(newTaskData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        setTasks(prevTasks => [...prevTasks, data]); 
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${url}`, {
      method: 'DELETE',
      })
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1>To do List</h1>
      <div className="input-container">
        <input
          className="input-text"
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
          tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task.label}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
