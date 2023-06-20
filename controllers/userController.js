import User from "../models/User.js"
import logger from '../config/log.js'

export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" })
            .select("name birthdate phone login password group role")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getAllInspectors = async (req, res) => {
    try {
        const students = await User.find({ role: "inspector" })
            .select("name phone login password role")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const createUser = async (req, res) => {
    try{
        const checkLogin = await User.findOne({ login: req.body.login })
        if(checkLogin) return res.status(200).json(false)
        const result = await User.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateUser = async (req, res) => {
    try{
        const checkLogin = await User.findOne({ $and: [{ _id: { $ne: req.params.id } }, { login: req.body.login }] });
        if (checkLogin) return res.json(false)
        const result = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
        logger.info(`${req.user?.name} - ${user.name} ning malumotlarini bazadan ochirdi: ${new Date().toISOString()}`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}