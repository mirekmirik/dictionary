import { SchemaTypes } from "mongoose";
import { model, Schema, Model, Document } from 'mongoose'
import { REQUIRE_LOGIN, REQUIRE_PASSWORD } from "../config/auth";
import { Dictionary } from "./Dictionary";


export interface IUser extends Document {
    login: string,
    password: string,
    dictionary: Schema.Types.ObjectId,
    addMarked(word: string): Promise<void>;
    addRecents(word: string): Promise<void>
}


const UserSchema: Schema = new Schema({
    login: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, `can't be blank`],
        minlength: [REQUIRE_LOGIN, `Please use minimum of ${REQUIRE_LOGIN} login's characters`],
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: [REQUIRE_PASSWORD, `Please use minimum of ${REQUIRE_PASSWORD} password's characters`]
    },
    dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary'
    },
})

UserSchema.methods.addMarked = async function (word: string): Promise<void> {
    try {
        const dictionary = await Dictionary.findById(this.dictionary);
        if (!dictionary) {
            throw new Error('Dictionary cannot be defined...');
        }

        const isExistWord = dictionary.marked.includes(word);
        if (isExistWord) {
            dictionary.marked = dictionary.marked.filter(data => data !== word);
        } else {
            dictionary.marked.unshift(word);
        }

        await dictionary.save();
    } catch (error) {
        throw new Error('Unable to add marked word');
    }
};



UserSchema.methods.addRecents = async function (word: string): Promise<void> {
    try {
        const dictionary = await Dictionary.findById(this.dictionary);
        if (!dictionary) {
            throw new Error(`Dictionary cannot be defined...`);
        }

        const isExistWord = dictionary.recents.includes(word);
        if (isExistWord) {
            dictionary.recents = dictionary.recents.filter(data => data !== word);
        }
        dictionary.recents.unshift(word);
        await dictionary.save();
    } catch (err) {
        throw new Error(err.message);
    }
};


export const User: Model<IUser> = model<IUser>('User', UserSchema);

