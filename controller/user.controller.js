const User = require("../models/user.models");
const Models = require("../models/message.models");

const {
  registerValidation,
  loginValidation,
} = require("../validation/user.validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCrl = {
  login: async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ msg: error.details[0].message });

    //Checking if email exists.
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ msg: "Email does not already exists." });

    //Checking if password is correct.
    const checkingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkingPassword)
      return res.status(400).json({ msg: "Password is not correct" });

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   path: "/user/login",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.header("auth-token", token).json({ accessToken: token });
  },
  register: async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).json({ msg: error.details[0].message });

    //Checking if user is already in the database
    const emailExits = await User.findOne({ email: req.body.email });

    if (emailExits)
      return res.status(400).json({ msg: "Email already exists." });

    if (req.body.password !== req.body.rf_password)
      return res.status(400).json({ msg: "Rf_password is not correct." });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    const room = new Models.room({
      uuid: user._id,
    });

    try {
      const saveUser = await user.save();
      const saveRoom = await room.save();

      res.json({ success: true, user_id: user._id });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAdmin: async (req, res) => {
    try {
      const admin = await User.find({ role: "ADMIN" });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCrl;
