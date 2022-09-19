import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import bodyParser from 'body-parser'
import mongoose  from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import memoryRouter from './routes/memory.js'
import userRouter from './routes/user.js'

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send("social media backend");
})

app.use('/posts', memoryRouter)
app.use('/user', userRouter)

// mongodb
const CONNECTION_URL = "mongodb://localhost:27017/mernSocials" || process.env.MONGO_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log('database connected');
})
.catch((e)=>{
  console.log(e.message);
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

