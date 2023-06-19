import { Schema, model } from "mongoose"

const TourPlanSchema = new Schema ({
    title: String,
    note: String,
    date: Array,
    place: Array,
    placeNote: Array,
    budgets: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
    timestamps: true,
    }
)

const TourPlanModel = model('TourPlan', TourPlanSchema)

module.exports = TourPlanModel

export {};