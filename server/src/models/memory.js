import mongoose  from "mongoose";

const memorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creator: String,
  tags: {
    type: [String],
    maxLength: 3,
  },
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
    default: false,
  },
});

export const Memory = mongoose.model('Memory', memorySchema)

