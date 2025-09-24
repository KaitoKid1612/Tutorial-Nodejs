const express = require("express");
const { todos } = require("./todos");

const app = express();
app.use(express.json()); // middleware để parse JSON body

// Lấy tất cả todo
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Lấy todo theo id
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// Tạo todo mới
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Cập nhật todo
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// Xóa todo
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
