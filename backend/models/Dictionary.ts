import { SchemaTypes } from "mongoose";
import { model, Schema, Model, Document } from 'mongoose'


export interface IDictionary extends Document {
    marked: string[],
    recents: string[]
}


const DictionarySchema: Schema = new Schema({
    marked: [{
        type: String,
    }],
    recents: [{
        type: String,
    }]
})

export const Dictionary: Model<IDictionary> = model<IDictionary>('Dictionary', DictionarySchema);