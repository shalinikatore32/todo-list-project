import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // Filter state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Fetch todos from the backend with filters
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`http://localhost:5000/todos?filter=${filter}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    };
    fetchTodos();
  }, [filter]);

  // Add a new todo with date
  const addTodo = async (text, date) => {
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, date }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id, isCompleted) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // Filter todos by search query
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        />
      </div>

      {/* Filter Buttons */}
      <div>
        <button className='filter-btn' onClick={() => setFilter('All')}>All</button>
        <button className='filter-btn' onClick={() => setFilter('Pending')}>Pending</button>
        <button className='filter-btn' onClick={() => setFilter('Completed')}>Completed</button>
      </div>

      {/* Todo List */}
      <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
