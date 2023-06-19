import { Request, Response } from "express";
const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10);
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET


const User = require('../models/user.model');

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

exports.registerUser = async(req:TypedRequestBody<{ email: string, password: string }>, res:Response) => {
    const { email, password } = req.body
    try {
      const isUserExist = await User.findOne({email})
      if(isUserExist) {
          return res.json('The user is already exist')
      } 

      const data =  await User.create({
            username: email,
            email,
            password: bcryptjs.hashSync(password, salt)
        })
        res.status(200).json(data)
    } catch (error) {
        return res.status(404).json('Something went wrong. Please try again')
    }
}

exports.loginUser = async(req:TypedRequestBody<{email: string, password:string}>, res:Response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email})
      if(!user) {
          return res.status(400).json({error:'User not found', data:null})
      } 
        
    const passCheck = await bcryptjs.compare(password, user.password)
    if(passCheck) {
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET, {})

        if(res.status(200)) {
            return res.json({status: "Ok", data: token})
        } else {
            return res.json({status:"Error", data: null})
        }
    }
    return res.json({status:"Error", error: "Wrong credentials", data: null})
    } catch (error) {
       return res.status(400).json('Something went wrong. Please try again')
    }
}

exports.getUser = async (req:Request, res:Response) => {
    const {token} = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)

        User.findOne({email: user.email}).then((data:any) => {
           return res.status(200).send({data})
        })
        .catch((e:never) => {
           return res.status(400).send({status: 'error',message: e})
        })
    } catch (error) {
       return res.status(400).json('Something went wrong. Please try again')
    }
}