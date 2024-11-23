// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  category: { type: String, enum: ['Work', 'Personal', 'College', 'Other'], default: 'Other' }, // Category field
  tags: { type: [String], default: [] } // Tags field, array of strings
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
