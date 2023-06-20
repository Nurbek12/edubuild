import { Schema, model } from 'mongoose'

export const Group = model('groups', new Schema({
    name: {
        type: String,
        required: true
    }
}))

export const Science = model('sciences', new Schema({
    name: {
        type: String,
        required: true
    }
}))