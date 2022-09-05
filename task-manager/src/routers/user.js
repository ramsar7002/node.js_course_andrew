const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = new express.Router();

router.post("/users", async (req, res, next) => {
  try {
    const userExist = await User.find({ email: req.body.email });
    if (userExist) {
      return res.status(400).send("User already exist!");
    }
    const user = new User(req.body);
    console.log(user);
    // user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/users/:id", async (req, res, next) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid fields");
  }

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(401).send("User unauthorized");
    }

    const user = await User.findByCredentials(email, password);
    res.send(user);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }

  //   const user = User.findByIdAndDelete({});
});

module.exports = router;
