/* eslint-disable @typescript-eslint/no-explicit-any */

import request from 'supertest'
import makeApp from '../config/express.config'
import User from '../entities/user.entity'
import bcrypt from 'bcrypt'

const app = makeApp()

jest.mock('../entities/user.entity')
jest.mock('bcrypt')

describe('POST /api/v1/users/register', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Reset mocks before each test
  })

  it('should create a new user', async () => {
    //Mock behaviour of user
    ;(User.findOne as jest.Mock).mockResolvedValue(null)

    // bcrypt.hash as jest.Mock.mockResolvedValue('hashedPassword123') // Mocked hashed password
    User.prototype.save.mockResolvedValue({
      userName: 'John Doe',
      password: 'hashedPassword123',
      _id: 'mockUserId'
    })
    const response = await request(app).post('/api/v1/users/register').send({
      userName: 'John Doe',
      password: 'password123'
    })

    expect(User.findOne).toHaveBeenCalledWith({ userName: 'John Doe' })
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      success: true,
      message: 'User registered successfully',
      data: {
        userName: 'John Doe',
        password: 'hashedPassword123',
        _id: 'mockUserId'
      }
    })
  })

  it('should return a 404 error for invalid data', async () => {
    // Assertions for invalid data response
    const response = await request(app).post('/api/v1/users/register').send({
      userName: 'John Doe'
    })
    expect(response.statusCode).toBe(400)
  })
})
