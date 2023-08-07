import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import '../../styles/TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Error al cargar la lista de tareas:', error);
      });
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setNewTask('');

      try {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
          method: 'PUT',
          body: JSON.stringify(newTasks),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error al actualizar la lista en el servidor');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
    }
  };

  const handleDeleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
        method: 'PUT',
        body: JSON.stringify(updatedTasks),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error al actualizar la lista en el servidor');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
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
          tasks.map((task, index) => (
            <TodoItem key={index} task={task} onDelete={() => handleDeleteTask(index)} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;

