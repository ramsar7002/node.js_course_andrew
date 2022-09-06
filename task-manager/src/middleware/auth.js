const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismyuniquecourse");
    const user = await User.findById({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(user);

    if (!user || user.tokens.length === 0) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};
module.exports = auth;
