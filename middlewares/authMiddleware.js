import jwt from 'jsonwebtoken'
import { secret } from '../config/keys.js'
import User from '../models/User.js'

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({error: 'Вы не можете сделать этот запрос.'})
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, secret, (err, payload)=>{
        if(err) return res.status(401).json({error: 'Вы не можете сделать этот запрос.'})
        User.findById(payload._id).then(user => { 
            req.user = user
            next()
        })
    });
}