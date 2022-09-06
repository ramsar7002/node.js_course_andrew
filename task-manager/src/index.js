const express = require("express");
require("./db/mongoose");
const { ObjectId } = require("mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//-------------
// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   const task = await Task.findById("63177f552e0b1706cbe79122");
//   await task.populate("owner");
//   //   console.log(task.owner);
//   const user = await User.findById("6317451db907d5d40ed9b85b");
//   await user.populate("tasks");
//   console.log(user.tasks);
// };
// main();
