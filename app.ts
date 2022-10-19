import express from "express"
const dotenv = require('dotenv')
const connectDatabase = require('./src/db')

dotenv.config()

connectDatabase()

const app = express()

app.use(require('./src/routes'))

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started at ${process.env.APP_URL}:${process.env.SERVER_PORT}`)
})

export default app