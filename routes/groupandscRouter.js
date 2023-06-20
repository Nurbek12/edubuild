import { Router } from "express"
import { creteGroup, deleteGroup, editGroup, getAllGroups,
creteScience, deleteScience, editScience, getAllScience} from '../controllers/groupandscController.js'
import { auth } from "../middlewares/authMiddleware.js"

export const groupRouter = Router()
    .get('/', auth, getAllGroups)
    .post('/', auth, creteGroup)
    .put('/:id', auth, editGroup)
    .delete('/:id', auth, deleteGroup)
    
export const scienceRouter = Router()
    .get('/', auth, getAllScience)
    .post('/', auth, creteScience)
    .put('/:id', auth, editScience)
    .delete('/:id', auth, deleteScience)