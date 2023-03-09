import 'dotenv/config'
import express from 'express'
import db from './database'

const app = express()
app.set('port', process.env.PORT_APP || 5000)

const loadRoutes = () => {
  // Load all routes
}

const loadMiddlewares = () => {
  // Load all middlewares
}

const loadDatabase = async () => {
  // Load database connection
  const connection = await db.connect()

  if (connection) {
    console.log('Connected to MySQL database')
  } else {
    console.log('Error connecting to MySQL database')
  }
}

const loadServices = async () => {
  // Load all services
  loadRoutes()
  loadMiddlewares()
  await loadDatabase()
}

loadServices()

export default app
