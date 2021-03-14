import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import todos from "./routes/todos.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use("/api/todos", todos);
app.use("/api/auth", auth);
app.use("/api/users", users);

app.use(cors());

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
