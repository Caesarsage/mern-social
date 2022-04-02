import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const posts = req.body;
  const newPost = new PostMessage(posts);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const {id: _id} = req.params
  const post = req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json('invalid id')

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};
