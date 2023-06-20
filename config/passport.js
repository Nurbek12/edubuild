import passport from "passport"
import localStategy from 'passport-local'
import bcrypt from 'bcryptjs'
import User from "../models/User.js"

export default app => {
    passport.use(new localStategy((login, password, done) => {
        User.findOne({ login }, (err, user) => {
            if(err) return done(err)

            if(!user) return done(null, false, { message: 'Login or Password incorrect!' })

            bcrypt.compare(password, user.password, (_, match) => {
                if(match) return done(null, user)
                else return done(null, false, { message: 'Login or Password incorrect!' })
            })
        })
    }))

    app.use(passport)

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))
}