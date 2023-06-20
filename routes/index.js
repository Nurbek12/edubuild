import { Router } from "express"
import { Group } from '../models/GroupAndSceince.js'
import User from "../models/User.js"
import Test from "../models/Test.js"
import { fileURLToPath } from 'url'
import { join } from 'path'

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default Router()
    .get('/info', async (req, res) => {
        const students = (await User.find({ role: 'student' })).length
        const inspectors = (await User.find({ role: 'inspector' })).length
        const tests = await Test.count()
        const groups = await Group.count()

        return res.status(200).json({ students, inspectors, tests, groups })
    })
    .get('/logs', async (req, res) => res.sendFile(join(dirname, '../', 'app.log')))
    .get('/all/names', async (req, res) => {
        const students = await User.find({ role: 'student' }).select('name')
        const tests = await Test.find().select('name')
        const groups = await Group.find().select('name')

        return res.status(200).json({ students, tests, groups })
    })