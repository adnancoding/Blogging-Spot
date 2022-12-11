import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  let emailCheck;
  try {
    existingUser = await User.findOne({ name });
    if (existingUser)
      return res.json({ message: "Name already used", status: false });
    emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "Email already used", status: false });

    if (name < 5)
      return res.json({
        message: "Name should be greater than 5 characters",
        status: false,
      });
  } catch (err) {
    next(err);
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.json({
      message: "Couldnt Find User By This Email",
      status: false,
    });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.json({ message: "Incorrect Password", status: false });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser });
};
