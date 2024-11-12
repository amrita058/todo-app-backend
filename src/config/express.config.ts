import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import { errorMiddleware } from '../middleware/error.middleware'
import routes from '../routes/index.routes'
import { ErrorHandler } from './error.config'

const app: Express = express()

const initialiseMiddleware = (app: Express) => {
  app.use(cors({ origin: '*' }))
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}

const initializeRoutes = (app: Express) => {
  //health check api use
  app.get('/', (req: Request, res: Response) => {
    res.send('Api is running')
  })

  app.use('/api/v1', routes)

  app.all('*', () => {
    const error = new ErrorHandler('Path not found', 404)
    error.name = 'Not found'
    throw error
  })
}

const initializeErrorHandler = (app: Express) => {
  app.use(errorMiddleware)
}

const makeApp = () => {
  initialiseMiddleware(app)
  initializeRoutes(app)
  initializeErrorHandler(app)
  return app
}

export default makeApp
