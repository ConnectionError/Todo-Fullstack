import Todo from "../models/Todo.js";

export const getTodo = async (req, res) => {
  try {
    console.log(req.body);
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export const createTodo = (req, res) => {
  res.send("This is create todo route");
};
