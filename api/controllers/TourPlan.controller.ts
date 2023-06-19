import { Request, Response } from "express"
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET

const TourPlan = require('../models/TourPlan.model')

exports.getPlans = async (req:Request, res:Response) => {
    const plans = await TourPlan.
    find({userId: req.body.id})
    .populate('userId',['username'])
    .sort({createdAt: - 1})

    res.json(plans)
}

exports.getPlanById = async (req:Request, res:Response) => {
    const plan = await TourPlan.
    find({_id: req.params.id})
    .populate('userId',['username'])

    res.json(plan[0])
}

exports.createPlan = async (req: Request, res:Response) => {
    const {token} = req.body
    jwt.verify(token, JWT_SECRET, {}, async(error:never, info:any) => {
        if(error) throw error

        const newPlan = await TourPlan.create({
            title: null,
            note: null,
            date: null,
            budgets: 0,
            userId: info.id
        })
        console.log(newPlan);
        res.json(newPlan)
    })
}

exports.updatePlan = async (req: Request, res:Response) => {
    const {id} = req.params
    console.log(req.body);
    const updatedPlan = await TourPlan.findOneAndUpdate({_id: id}, req.body)
    res.json(updatedPlan)
}

exports.deletePlan = async (req: Request, res:Response) => {
    const {id} = req.params
    const deleted = await TourPlan.deleteOne({_id: id})

    res.json(deleted)
}