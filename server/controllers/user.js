import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const login = async (req,res)=>{
  const {email, password} = req.body

  try {
    const existingUser = await User.findOne({email});
    if(!existingUser) return res.status(404).json({message: "User does not exist"})

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordMatch) return res.status(400).json({message: 'Invalid credentials'})

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'someSecretToChangeLater', {expiresIn: "1h"})

    res.status(200).json({message: 'successful', result: existingUser, token})

  } catch (error) {
    res.status(400).json({message: 'Error occur'})
  }

}

export const register = async (req,res)=>{
  const {email, password, confirmPassword, firstName, lastName} = req.body;

  try {
    const existingUser = await User.findOne({email})

    if(existingUser) return res.status(400).json({message: 'User already exists'})
    if(password !== confirmPassword) return res.status(400).json({message: 'Password do not match'})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const result = User.create({email, password: hashPassword, name:`${firstName} ${lastName}`})

    const token = jwt.sign({email: result.email, id: result._id}, 'someSecretToChangeLater', {expiresIn: "1h"})

    res.status(200).json({message: 'successful', result , token})

  } catch (error) {
    res.status(400).json({message: 'Error occur'})
  }
}