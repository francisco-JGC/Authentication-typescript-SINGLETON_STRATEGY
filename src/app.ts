import 'dotenv/config'
import express from 'express'

const app = express()
app.set('port', process.env.PORT_APP || 5000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
