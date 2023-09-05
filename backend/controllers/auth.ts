import { Response, Request } from "express";
import { IUser, User } from "../models/User";
import { REQUIRE_LOGIN, REQUIRE_PASSWORD } from "../config/auth";
import { Dictionary } from "../models/Dictionary";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req: Request, res: Response) => {
    const { login, password } = req.body
    try {
        if (password.trim().length < REQUIRE_PASSWORD || password.trim().length < REQUIRE_LOGIN) {
            throw new Error(`Please, use minimum 5 symbols for password, and 4 for login...`)
        }
        const isExistLogin = await User.findOne({ login })
        if (isExistLogin) {
            throw new Error(`This user has been already registered!`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const dictionary = new Dictionary({ marked: [], recents: [] })
        await dictionary.save()
        const user: IUser = new User({
            login,
            password: hashPassword,
            dictionary: dictionary._id
        })
        await user.save()
        return res.send(user);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.login = async (req: Request, res: Response) => {
    const { login, password } = req.body
    try {
        const user = await User.findOne({ login })
        if (!user) {
            throw new Error(`Password or Login hasn't wrote correctly.`)
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new Error(`Password or Login hasn't wrote correctly.`)
        }
        const token = jwt.sign({
            login: user.login
        }, process.env.JWT_SECRET)
        res.header('Authorization', `Bearer ${token}`)
        res.json({
            token
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


exports.profile = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
