const Todo = require('../models/todoModel');

// Lấy tất cả todo
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo mới
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            user: req.user.id
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật
exports.updateTodo = async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa
exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách todo của riêng user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};