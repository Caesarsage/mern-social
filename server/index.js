import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import bodyParser from 'body-parser'
import mongoose  from 'mongoose'
import cors from 'cors'

import postRouter from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())




app.use('/posts', postRouter)


// mongodb
console.log(process.en)
const CONNECTION_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mern-social"
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))
})
.catch((e)=>{
  console.log(e.message);
})