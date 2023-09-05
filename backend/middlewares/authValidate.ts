import { Request, Response } from "express";
import { IUser } from "../models/User";
const jwt = require('jsonwebtoken');

interface UserRequest extends Request {
    user: Pick<IUser, 'login'>;
}

export const authValidate = (req: UserRequest, res: Response, next: any) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(400).json({
            error: 'Access denied!'
        })
    }
    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(400).json({
            error: 'Access denied!'
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
};


