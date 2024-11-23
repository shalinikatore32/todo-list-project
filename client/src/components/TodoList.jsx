import React from "react";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  
  // Check if todos is an array
  if (!Array.isArray(todos)) {
    return <p>There was an error fetching the todos. Please try again later.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => updateTodo(todo._id, !todo.isCompleted)} // Toggle the completion status
            style={{ marginRight: "10px" }}
          />
          <span
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => updateTodo(todo._id, !todo.isCompleted)} // Optional: Also toggle completion by clicking the text
          >
            {todo.text}
          </span>
          <div>
            <strong>Category:</strong> {todo.category}
            <br />
            <strong>Tags:</strong> {Array.isArray(todo.tags) ? todo.tags.join(', ') : 'No tags'}
          </div>
          <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
