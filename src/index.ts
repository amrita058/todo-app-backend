// src/index.ts
import { Express } from 'express'
import { connectDB } from './config/database.config'
import { env } from './config/env.config'
import makeApp from './config/express.config'
import { scheduleTaskReminder } from './config/jobSchedule.config'

const app: Express = makeApp()
const port = env.PORT || 3000

connectDB()

scheduleTaskReminder()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
