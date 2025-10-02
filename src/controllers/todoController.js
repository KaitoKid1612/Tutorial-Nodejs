const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({ ...req.body, user: req.user._id });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = "", status } = req.query;
        const query = {
            user: req.user.userId,
            ...(search && { title: { $regex: search, $options: "i" } }),
            ...(status && { status })
        };

        const todos = await Todo.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Todo.countDocuments(query);

        res.json({ total, page, limit, todos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
