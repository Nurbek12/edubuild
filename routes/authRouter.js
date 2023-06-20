import { Router } from 'express'
import { login } from '../controllers/authConroller.js'

export default Router()
    .post('/login', login)