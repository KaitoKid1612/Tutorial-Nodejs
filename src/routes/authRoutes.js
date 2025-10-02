const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validateMiddleware");
const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(registerSchema), authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;
