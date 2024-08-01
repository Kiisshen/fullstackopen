const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('api/blogs/ GET tests', () => { 
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect('Content-Type', /application\/json/)
    })
    test('the right blogs are returned from database', async () => {

    })
    after(async () => {
    await mongoose.connection.close()
    })
})

describe('api/blogs/ POST tests', () => { 
    test('blogs can be added to database', async () => {
        
    })
})
