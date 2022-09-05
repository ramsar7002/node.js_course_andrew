const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res, next) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res, next) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/tasks/:id", async (req, res, next) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid fields");
  }

  try {
    const task = await Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const task = await User.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }

  const user = User.findByIdAndDelete({});
});

module.exports = router;
