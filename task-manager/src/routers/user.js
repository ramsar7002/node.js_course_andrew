const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res, next) => {
  try {
    const userExist = await User.find({ email: req.body.email });

    if (userExist.length !== 0) {
      return res.status(400).send("User already exist!");
    }
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users/me", auth, async (req, res, next) => {
  res.send(req.user);
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
    const token = await user.generateAuthToken();
    res.send({ user, token });
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

router.post("/users/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/users/logoutall", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("Successfully disconnected from all devices");
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
