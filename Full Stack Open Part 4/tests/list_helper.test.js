const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('totalLikes returns right amount of likes with populated array', () => {
        const blogs = [
            {
                "_id": "66a9eab6f2bdea8c0c6e9cf1",
                "title": "Markun Blogipostaus",
                "author": "Markku",
                "url": "www.blogi.fi/123",
                "likes": 4,
                "__v": 0
            },
            {
                "_id": "66a9ebcb273229e3d3d31754",
                "title": "Juuson Blogipostaus",
                "author": "Juuso",
                "url": "www.blogi.fi/1234",
                "likes": 6,
                "__v": 0
            },
            {
                "_id": "66a9ed70331199d41e103e1b",
                "title": "Paten Blogipostaus",
                "author": "Pate",
                "url": "www.blogi.fi/12345",
                "likes": 0,
                "__v": 0
            }
        ]
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 10)
    })
    
    test('totalLikes returns 0 with empty array', () => {
        const blogs = []
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
    
    test('totalLikes returns 0 with null type parameter', () => {
        blogs = null
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('totalLikes returns blogs likes with list of one blog as parameter', () => {
        const blogs = [
            {
                "_id": "66a9ed70331199d41e103e1b",
                "title": "Paten Blogipostaus",
                "author": "Pate",
                "url": "www.blogi.fi/123",
                "likes": 5,
                "__v": 0
            }
        ]
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })
})

describe('favourite blog', () => {
    test('favourite blog returns the blog with most likes', () => {
        const blogs = [
            {
                "_id": "66a9eab6f2bdea8c0c6e9cf1",
                "title": "Markun Blogipostaus",
                "author": "Markku",
                "url": "www.blogi.fi/123",
                "likes": 4,
                "__v": 0
            },
            {
                "_id": "66a9ebcb273229e3d3d31754",
                "title": "Juuson Blogipostaus",
                "author": "Juuso",
                "url": "www.blogi.fi/1234",
                "likes": 6,
                "__v": 0
            },
            {
                "_id": "66a9ed70331199d41e103e1b",
                "title": "Paten Blogipostaus",
                "author": "Pate",
                "url": "www.blogi.fi/12345",
                "likes": 0,
                "__v": 0
            }
        ]
    
        const result = listHelper.favouriteBlog(blogs)
        assert.strictEqual(result.likes, 6)
        assert.strictEqual(result.author, "Juuso")
        assert.strictEqual(result.title, "Juuson Blogipostaus")
    })

    test('favourite blog returns one of the blogs with most likes', () => {
        const blogs = [
            {
                "_id": "66a9eab6f2bdea8c0c6e9cf1",
                "title": "Markun Blogipostaus",
                "author": "Markku",
                "url": "www.blogi.fi/123",
                "likes": 6,
                "__v": 0
            },
            {
                "_id": "66a9ebcb273229e3d3d31754",
                "title": "Juuson Blogipostaus",
                "author": "Juuso",
                "url": "www.blogi.fi/1234",
                "likes": 6,
                "__v": 0
            }
        ]
    
        const result = listHelper.favouriteBlog(blogs)
        assert.strictEqual(result.likes, 6)
    })

    test('favourite blog returns one of the blogs if all blogs have 0 likes', () => {
        const blogs = [
            {
                "_id": "66a9eab6f2bdea8c0c6e9cf1",
                "title": "Markun Blogipostaus",
                "author": "Markku",
                "url": "www.blogi.fi/123",
                "likes": 0,
                "__v": 0
            },
            {
                "_id": "66a9ebcb273229e3d3d31754",
                "title": "Juuson Blogipostaus",
                "author": "Juuso",
                "url": "www.blogi.fi/1234",
                "likes": 0,
                "__v": 0
            }
        ]
    
        const result = listHelper.favouriteBlog(blogs)
        assert.ok(result.author != "")
        assert.ok(result.title != "")
        assert.ok(result.likes == 0)
    })
})