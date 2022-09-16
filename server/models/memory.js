import mongoose  from "mongoose";

const memorySchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isPrivate: {
    type: Boolean,
    default: false
  }
});

const Memory = mongoose.model('Memory', memorySchema)

export default Memory;