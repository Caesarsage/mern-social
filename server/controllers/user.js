import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "someSecretToChangeLater",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "successful", result: existingUser, token });
  } catch (error) {
    res.status(400).json({ message: "Error occur" });
  }
};

export const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password do not match" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = User.create({
      email,
      password: hashPassword,
      result: existingUser,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "someSecretToChangeLater",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "successful", token, name: `${firstName} ${lastName}` });
  } catch (error) {
    res.status(400).json({ message: "Error occur" });
  }
};

export const getUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id).populate("memories");
    if (!user) {
      return res.json({ message: "No user found" });
    }
    return res.json({
      data: user,
      message: "User found",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, age, gender, twitter, linkedin, github, website, image } =
      await req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        age,
        image,
        gender,
        socials: {
          twitter,
          linkedin,
          github,
          website,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.send('User not updated')
    }
    return res.json({
      data: updatedUser,
      message: "User info updated"
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
  }
}

export const followUser = async (req, res) => {
  const { id } = await req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("invalid id");

  const user = await User.findById(id);

  const index = await user.followers.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // follow
    user.followers.push(req.userId);
  } else {
    // un-follow
    user.likes = post.likes.filter((id) => {
      return id !== req.userId;
    });
  }
}

export const forgetPassword = (req, res) => {}