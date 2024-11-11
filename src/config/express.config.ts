import express, { Express, NextFunction, Request, Response } from 'express'
import routes from '../routes/index.routes'
import { ErrorHandler } from './error.config'
import { errorMiddleware } from '../middleware/error.middleware'
import cors from 'cors'
import morgan from 'morgan'

const app: Express = express()

export const initialiseMiddleware = (app: any) => {
  app.use(cors({ origin: '*' }))
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}

export const initializeRoutes = (app: any) => {
  //health check api use
  app.get('/', (req: Request, res: Response) => {
    res.send('Api is running')
  })

  app.use('/api/v1', routes)

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorHandler('Path not found', 404)
    error.name = 'Not found'
    throw error
  })
}

export const initializeErrorHandler = (app: any) => {
  app.use(errorMiddleware)
}

initialiseMiddleware(app)
initializeRoutes(app)
initializeErrorHandler(app)

export { app }
