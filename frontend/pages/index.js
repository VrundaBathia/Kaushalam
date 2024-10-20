import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tasks from the backend API
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() !== '') {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask }),
      });
      const task = await res.json();
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Edit an existing task
  const editTask = async (id, newText) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    setEditingTask(null);
  };

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask === task._id ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => editTask(task._id, e.target.value)}
              />
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => setEditingTask(task._id)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
