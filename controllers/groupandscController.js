import { Group, Science } from '../models/GroupAndSceince.js'

export const getAllGroups = async (req, res) => {
    try{
        const groups = await Group.find()
        res.status(200).json(groups)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const creteGroup = async (req, res) => {
    try{
        const group = await Group.create(req.body)
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const editGroup = async (req, res) => {
    try{
        const group = await Group.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteGroup = async (req, res) => {
    try{
        await Group.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}



export const getAllScience = async (req, res) => {
    try{
        const result = await Science.find()
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const creteScience = async (req, res) => {
    try{
        const result = await Science.create(req.body)
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const editScience = async (req, res) => {
    try{
        const result = await Science.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteScience = async (req, res) => {
    try{
        await Science.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}