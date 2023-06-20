import { fileURLToPath } from 'url'
import path, { join } from 'path'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { port } from './config/keys.js'
import database from './config/database.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import testRouter from './routes/testRouter.js'
import { groupRouter, scienceRouter } from './routes/groupandscRouter.js'
import routes from './routes/index.js'

const dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express()
const server = createServer(app)

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }))
// app.use(express.static(path.join(dirname, 'dist')))

app.use('/', routes)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/group', groupRouter)
app.use('/science', scienceRouter)
app.use('/test', testRouter)

// app.use('*', async (req, res) => {
//     res.sendFile(join(dirname, 'dist', 'index.html'))
// })

server.listen(port, () => {
    database()
    console.log('Server start...')
})