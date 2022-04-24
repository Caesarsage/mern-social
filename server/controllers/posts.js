import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const {page} = req.query
  try {
    const LIMIT = 2;
    const startIndex = (Number(page) -1) * LIMIT 
    const total = await PostMessage.countDocuments({})


    const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)

    res.status(200).json({ data: posts, currentPage : Number(page), numberofPages: Math.ceil(total / LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req,res)=>{
  const {searchQuery, tags} = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    
    // either find all post that match title or tags array.
    // and inside array of tag, is one of the tag equals array of tags
    const posts = await PostMessage.find({$or: [
      {title}, {tags: {$in: tags.split(',')}}
    ]})

    res.json({data: posts})
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const posts = req.body;
  const newPost = new PostMessage({
    ...posts, 
    creator: req.userId, 
    createdAt: new Date().toISOString()
  });

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


export  const deletePost = async (req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('invalid id')

  await PostMessage.findByIdAndRemove(id)

  res.status(200).json({message:'post deleted successfully'})
}

export const likePost = async(req,res)=>{
  const {id} = req.params;

  if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('invalid id')

  const post = await PostMessage.findById(id)

  const index = await post.likes.findIndex((id)=> id === String(req.userId));
  
  if(index === -1){
    // like post
    post.likes.push(req.userId)
  }else{
    // dislike a post
    post.likes = post.likes.filter((id)=>{
      return id !== req.userId
    });
   
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true})

  res.json(updatedPost)
}

