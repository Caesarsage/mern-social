import mongoose from "mongoose";

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
  isAdmin: {
    type: String,
    default: false,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  socials: {
    linkedin: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
  memories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Memory",
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

export const User = mongoose.model("User", userSchema);
