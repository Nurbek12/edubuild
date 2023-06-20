import { Router } from "express"
import { getAllStudents, createUser, deleteUser, updateUser, getAllInspectors, } from '../controllers/userController.js'
import { auth } from "../middlewares/authMiddleware.js"

export default Router()
    .get('/student', auth, getAllStudents)

    // .get('/admin')

    // .get('/teacher')

    .get('/inspector', getAllInspectors)

    .post('/', auth, createUser)

    .put('/:id', auth, updateUser)

    .delete('/:id', auth, deleteUser)