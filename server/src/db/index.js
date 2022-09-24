import mongoose from "mongoose";

// mongodb

export const connectDB = function (readConfig) {
  let CONNECTION_URL = ''

  if (process.env.NODE_ENV === 'development') {
    CONNECTION_URL =  "mongodb://localhost:27017/mernSocials";
  }
  if (process.env.NODE_ENV === 'production') {
    CONNECTION_URL = readConfig.MONGO_URL;
  }
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
};