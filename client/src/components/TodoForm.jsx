import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Work'); // Default category
  const [tags, setTags] = useState(''); // Comma-separated tags

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = tags.split(',').map((tag) => tag.trim()); // Split tags by commas
    addTodo(text, date, category, tagArray);
    setText('');
    setDate('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="College">College</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
