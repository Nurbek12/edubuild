import User from '../models/User.js'
import { secret } from '../config/keys.js'
import jwt from 'jsonwebtoken'
import logger from '../config/log.js'

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        
        if(
            !user ||
            user.password !== req.body.password
        ) return res.json({ message: 'Login or Password incorrect!', success: false })
        
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '4h' })
        logger.info(`User ${user.id}: ${user.name}, IP:${req?.connection?.remoteAddress} logged in.`)
        res.status(200).json({ token, user, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error!' })
    }
}