const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/authMiddleware');

router.get('/', todoController.getTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
