import { set, connect } from 'mongoose'
import { mongourl } from './keys.js'

set('strictQuery', false)

export default async () => await connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected...'))
.catch((err) => console.log('Database error:', err))