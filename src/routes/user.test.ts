/* eslint-disable @typescript-eslint/no-explicit-any */

import request from 'supertest'
import { app } from '../config/express.config'

describe('POST /api/v1/users/register', () => {
  it('should create a new user', async () => {
    // console.log('test', app)
    const response = await request(app).post('/api/v1/users/register').send({
      userName: 'John Doe',
      password: 'password123'
    })
    expect(response.statusCode).toBe(201)
    // expect(response.body).toEqual({
    //   success: true,
    //   message: 'User registered successfully'
    // })
    // Assertions to verify user creation
  })

  it('should return a 404 error for invalid data', async () => {
    // Assertions for invalid data response
    const response = await request(app).post('/api/v1/users/register').send({
      userName: 'John Doe'
    })
    expect(response.statusCode).toBe(400)
  })
})
