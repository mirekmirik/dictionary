import { Response, Request } from "express";
import { IDictionary } from "../models/Dictionary";
import { User } from "../models/User";

exports.addMarked = async (req: Request, res: Response) => {
    const { login, word } = req.body;
    try {
        if (!word.trim().length) {
            throw new Error(`Word cannot be empty`)
        }
        if (!login.trim()) throw new Error(`Login hasn't been defined...`);
        const findUser = await User.findOne({ login });
        if (!findUser) throw new Error(`This user cannot be defined`)
        await findUser.addMarked(word)
        return res.status(200).json(word)

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.getMarked = async (req: Request, res: Response) => {
    const { login } = req.body;
    try {
        if (!login) throw new Error(`Login hasn't been defined...`);
        const findUser = await User.findOne({ login }).populate('dictionary')
        if (!findUser) throw new Error(`This user cannot be defined`)
        const dictionary = (findUser.dictionary as unknown) as IDictionary;
        if (!dictionary) throw new Error(`Dictionary cannot be defined...`)
        const marked = dictionary.marked;
        res.status(200).json(marked);
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.addRecents = async (req: Request, res: Response) => {
    const { login, word } = req.body
    try {
        if (!login.trim().length) {
            throw new Error(`Login hasn't been provided...`)
        }
        if (!word.trim().length) {
            throw new Error(`Word hasn't been provided...`)
        }
        const findUser = await User.findOne({ login })
        if (!findUser) {
            throw new Error(`This user cannot be defined...`)
        }
        await findUser.addRecents(word)
        return res.status(200).json(word)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.getRecents = async (req: Request, res: Response) => {
    const { login } = req.body
    try {
        if (!login.trim().length) throw new Error(`Login hasn't been provided`)
        const findUser = await User.findOne({ login }).populate('dictionary')
        if (!findUser) throw new Error(`This user cannot be defined...`)
        const dictionary = (findUser.dictionary as unknown) as IDictionary
        if (!dictionary) throw new Error(`Dictionary cannot be defined...`)
        const recents = dictionary.recents
        return res.status(200).json(recents)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.deleteRecents = async (req: Request, res: Response) => {
    const { login, word } = req.params
    try {
        if (!login.trim().length) throw new Error(`Login hasn't been provided`)
        const findUser = await User.findOne({ login }).populate('dictionary')
        if (!findUser) throw new Error(`This user cannot be defined...`)
        const dictionary = (findUser.dictionary as unknown) as IDictionary
        if (!dictionary) throw new Error(`Dictionary cannot be defined...`)
        const recents = dictionary.recents.filter((recent) => recent !== word)
        dictionary.recents = recents;
        await dictionary.save()
        return res.status(200).json(recents)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}