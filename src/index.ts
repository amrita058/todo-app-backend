// src/index.ts
import express, { Express, Request, Response } from 'express'
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes
} from './config/express.config'
import { env } from './config/env.config'
import { connectDB } from './config/database.config'
import { scheduleTaskReminder } from './config/jobSchedule.config'
import { app } from './config/express.config'

//version as 0.0.1

// const app: Express = express();
const port = env.PORT || 3000

// initialiseMiddleware()

connectDB()

// initializeRoutes()

// initializeErrorHandler()

scheduleTaskReminder()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
