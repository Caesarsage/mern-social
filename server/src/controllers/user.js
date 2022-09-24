import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Memory } from "../models/memory.js";

import { User } from "../models/user.js";

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

    const result = {
      id: existingUser._id,
      name: existingUser.name,
      imageUrl: existingUser.imageUrl,
    };

    res.status(200).json({ message: "successful", result, token });
  } catch (error) {
    res.status(400).json({ message: "Error occur" });
  }
};

export const register = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    about,
    lastName,
    gender,
    twitter,
    linkedin,
    github,
    website,
    imageUrl = process.env.imageUrlDefault,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = new User({
      name: `${firstName} ${lastName}`,
      imageUrl,
      gender,
      about,
      socials: {
        twitter,
        linkedin,
        github,
        website,
      },
      email,
      password: hashPassword,
    });

    await result.save();
    console.log(result);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "someSecretToChangeLater",
      { expiresIn: "1h" }
    );

    const sendToFE = {
      id: result._id,
      name: result.name,
      imageUrl: result.imageUrl,
      about: result.about,
      gender: result.gender,
      socials: {
        twitter: result.socials.twitter,
        linkedin: result.socials.linkedin,
        github: result.socials.github,
        website: result.socials.website,
      },
      email: result.email,
    };

    res.status(200).json({ message: "successful", token, result: sendToFE });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
    // res.json({ message: "Error occur" + error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password")
      .populate("followers")
      .populate("following")
      .populate("memories");

    if (!user) {
      return res.json({ message: "No user found" });
    }
    console.log(user);
    return res.json({
      data: user,
      message: "User found",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
};

export const updateUser = async (req, res) => {
  const {
      name,
      about,
      gender,
      twitter,
      linkedin,
      github,
      website,
      imageUrl,
  } = req.body;
  try {    
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        about,
        imageUrl,
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
      return res.send("User not updated");
    }
    console.log(updatedUser);
    return res.json({
      data: updatedUser,
      message: "User info updated",
    });
   
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (req, res) => {
  const { id } = await req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("invalid id");

  const user = await User.findById(id);

  const index = await user.followers.findIndex((id) => {
    return String(id) === String(req.userId);
  });

  if (index === -1) {
    // follow
    user.followers.push(req.userId);
    await User.updateOne({ _id: req.userId }, { $push: { following: id } });
  } else {
    // un follow;
    user.followers = user.followers.filter((id) => {
      return String(id) !== String(req.userId);
    });
    await User.updateOne({ _id: req.userId }, { $pull: { following: id } });
  }
  await User.findById(req.userId);
  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
  })
    .select("-password")
    .populate("followers")
    .populate("following")
    .populate("memories");

  res.json(updatedUser);
};

export const forgetPassword = (req, res) => {};
