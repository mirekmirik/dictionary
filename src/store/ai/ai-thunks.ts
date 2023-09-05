import { createAsyncThunk } from "@reduxjs/toolkit";
import OpenAI from 'openai'
import { TypeOfText } from "../../types";
const Configuration = require('openai')




const configuration = new Configuration({
    organization: process.env.REACT_APP_ORGANIZATION_TOKEN,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const openai = new OpenAI({ ...configuration, dangerouslyAllowBrowser: true })




export const getAIText = createAsyncThunk<string, { words: string[], type: TypeOfText }, { rejectValue: string }>('@@ai/get-ai-text', async (data, { rejectWithValue }) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": "You are a good english-assistant" }, { role: "user", content: `Just write me a simple ${data.type} with this words: ${data.words.join(', ')}` }],
            model: "gpt-3.5-turbo"
        })
        if (!completion) {
            throw new Error(`Something went wrong untill getting a response...`)
        }
        const result = completion.choices[0].message.content
        return result?.replaceAll('\n', '<br/>') || 'No response from OpenAI'
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by add to recents word...');
    }
}) 