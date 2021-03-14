import express from "express";
import pkg from "express-validator";
import auth from "../middleware/auth.js";
import Todo from "../models/Todo.js";

const { check, validationResult } = pkg;
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("tags", "Tags is required").not().isEmpty(),
      check("endTime", "Endtime is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      description,
      tags,
      img,
      startTime,
      endTime,
      isPublic,
    } = req.body;
    const newTodo = {};
    newTodo.user = req.user.id;
    if (title) newTodo.title = title;
    if (description) newTodo.description = description;
    if (img) newTodo.img = img;
    if (startTime) newTodo.startTime = startTime;
    if (endTime) newTodo.endTime = endTime;

    newTodo.isPublic = !isPublic ? false : true;
    if (tags) {
      newTodo.tags = tags.split(",").map((tag) => tag.trim());
    }
    try {
      let todo = new Todo(newTodo);
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
);

export default router;
