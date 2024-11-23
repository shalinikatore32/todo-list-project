const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.js");

// Get all todos
// routes/todo.js
router.get('/todos', async (req, res) => {
    try {
      const { filter, category, tag } = req.query;
      let todos;
  
      // Filter by category or tags
      if (category) {
        todos = await Todo.find({ category });
      } else if (tag) {
        todos = await Todo.find({ tags: { $in: [tag] } });
      } else if (filter === 'Pending') {
        todos = await Todo.find({ isCompleted: false });
      } else if (filter === 'Completed') {
        todos = await Todo.find({ isCompleted: true });
      } else {
        todos = await Todo.find(); // Default to all todos if no filter is provided
      }
  
      res.status(200).json(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ message: "An error occurred while fetching todos." });
    }
  });
  
  

// Add a new todo
router.post('/todos', async (req, res) => {
    const { text, date } = req.body;
  
    const newTodo = new Todo({
      text,
      date: new Date(date),
    });
  
    try {
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// PUT route to update a to-do item
router.put("/todos/:id", async (req, res) => {
    const { isCompleted } = req.body;
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { isCompleted },
        { new: true }
      );
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: "Error updating todo" });
    }
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the todo" });
  }
});

module.exports = router;
