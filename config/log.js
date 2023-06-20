import { createLogger, transports } from 'winston'

export default createLogger({
  transports: [
    new transports.File({ filename: 'app.log' })
  ]
})