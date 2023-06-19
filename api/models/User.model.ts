import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 40,
      },
      password: {
        type: String,
        required: true,
        min: 6,
        max: 32,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
}, {
    collection: 'User'
});

const UserModel = model('User', UserSchema)

module.exports = UserModel

export {};