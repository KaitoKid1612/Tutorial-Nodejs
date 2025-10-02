require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ DB connection error:", err));

// Lấy tất cả todo
app.get("/api/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Lấy todo theo id
app.get("/api/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});

// Tạo todo mới
app.post("/api/todos", async (req, res) => {
    try {
        const newTodo = new Todo({ title: req.body.title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật todo
app.put("/api/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, completed: req.body.completed },
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});

// Xóa todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
