const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const db = require('./config/db')
db()

// Routes
const userRouter = require('./routes/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: 'https://learning-deployment-frontend.onrender.com',
    credentials: true
}))

app.use("/api/users",userRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT,function() {
    console.log(`Server is running on port ${PORT}`)
})
