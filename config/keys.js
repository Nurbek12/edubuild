import { config } from 'dotenv'

config()

export const mongourl = process.env.MONGOURL
export const secret = process.env.SECRET
export const sessionsecret = process.env.SESSION
export const sessionname = process.env.NSESSION
export const port = process.env.PORT