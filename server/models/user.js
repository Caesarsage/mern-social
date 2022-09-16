import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  age: String,
  gender: String,
  socials: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  followers: {
    type: [String]
  },
  memories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "memory",
  }
});

const User = mongoose.model('User', userSchema)

export default User;