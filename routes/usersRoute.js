const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { ObjectId } = require("mongodb");
const { usersCollection } = require("../models/userModel");

// register a new user
router.post("/register", async (req, res) => {
  try {
    const User = await usersCollection();
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    newUser.password = hashedPassword;

    // creates a new user in users collection
    const insertedNewUser = await User.insertOne(newUser);

    res.send({
      success: true,
      message: "Registration Successfull",
      data: insertedNewUser,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const User = await usersCollection();
    // check if user exists
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exists",
      });
    }
    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    // create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User logged in Successfully",
      data: token,
    });
  } catch (error) {
    console.log("error = ", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get user details by id
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const User = await usersCollection();
    const userId = new ObjectId(req.body.userId);
    const user = await User.findOne({ _id: userId }, { password: 0 });
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("error = ", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
