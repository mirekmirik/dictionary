require('dotenv').config({ path: './config.env' })
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { connectDB } = require('./config/db')
const app = express()
const PORT = process.env.PORT || 5000;


connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/dictionary', require('./routes/dictionary'))



const server = app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
