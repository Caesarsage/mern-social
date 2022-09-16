import mongoose from "mongoose";
import Memory from "../models/memory.js";

export const getMemories = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Memory.countDocuments({});

    const posts = await Memory.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberofPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Memory.findById(id);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMemoriesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(req.query);
  try {
    const title = new RegExp(searchQuery, "i");

    // either find all post that match title or tags array.
    // and inside array of tag, is one of the tag equals array of tags
    const posts = await Memory.find({
      $or: [{ title }, { tags: { $all: tags.split(",") } }],
    });
    // const posts = await Memory.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMemory = async (req, res) => {
  const posts = req.body;
  const newMemory = new Memory({
    ...posts,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newMemory.save();
    res.status(200).json(newMemory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMemory = async (req, res) => {
  const { id: _id } = req.params;
  const post = await req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("invalid id");

  try {
    const updatedMemory = await Memory.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedMemory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("invalid id");

  await Memory.findByIdAndRemove(id);

  res.status(200).json({ message: "post deleted successfully" });
};

export const likeMemory = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("invalid id");

  const post = await Memory.findById(id);

  const index = await post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like post
    post.likes.push(req.userId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => {
      return id !== req.userId;
    });
  }

  const updatedMemory = await Memory.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedMemory);
};

export const commentMemory = async (req, res) => {
  const { id } = await req.params;
  try {
    const { value }  = await req.body

    const post = await Memory.findById(id)
    post.comments.push(value)

    const updatedMemory = await Memory.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedMemory)
  } catch (error) {
    console.log(error);
  }
};
