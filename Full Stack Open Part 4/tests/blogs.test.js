const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogSchema");

const api = supertest(app);

describe("api/blogs/ GET tests", () => {
  test("blogs are returned as json", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  });
  test("the right amount of blogs are returned from database", async () => {
    const initialBlogs = [
      {
        title: "Pettering blogi",
        author: "Petteri",
        url: "Petteriblogi.fi",
        likes: 12,
      },
      {
        title: "Maken blogi",
        author: "Make",
        url: "Makenblogi.fi",
        likes: 16,
      },
      {
        title: "Juuson blogi",
        author: "Juuso",
        url: "Juusonblogi.fi",
        likes: 8,
      },
    ];
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 3);
  });
});

describe("api/blogs/ POST tests", () => {
  test("blogs have id identificator instead of _id", async () => {
    const blogToAdd = {
      title: "Pettering blogi",
      author: "Petteri",
      url: "Petteriblogi.fi",
      likes: 12,
    };

    await Blog.deleteMany({});
    await api.post("/api/blogs").send(blogToAdd);
    const response = await api.get("/api/blogs");

    assert.ok(response.body[0].id != null);
    assert.ok(response.body[0]._id == null);
  });
  test("blogs can be added with POST requests", async () => {
    const blogToAdd = {
      title: "Pettering blogi",
      author: "Petteri",
      url: "Petteriblogi.fi",
      likes: 12,
    };

    await Blog.deleteMany({});
    const resp1 = await api.get("/api/blogs");
    assert.strictEqual(resp1.body.length, 0);

    await supertest(app).post("/api/blogs").send(blogToAdd);
    const resp2 = await api.get("/api/blogs");
    assert.strictEqual(resp2.body.length, 1);
  });
});

describe("api/blogs/ commons tests", () => {
  test("if blogs is added withouth likes filed, likes is set to 0", async () => {
    const blogToAdd = {
      title: "Pettering blogi",
      author: "Petteri",
      url: "Petteriblogi.fi",
    };

    await Blog.deleteMany({});
    await supertest(app).post("/api/blogs").send(blogToAdd);
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body[0].likes, 0);
  });
  test("if title or url are not set, POST will respond with status code 400", async () => {
    const blogsToAdd = [
      {
        author: "Petteri",
        url: "Petteriblogi.fi",
        likes: 2,
      },
      {
        title: "PetterinBlogi",
        author: "Petteri",
        likes: 3,
      },
    ];
    await Blog.deleteMany({});

    const resp1 = await supertest(app).post("/api/blogs").send(blogsToAdd[0]);
    assert.strictEqual(resp1.status, 400);

    const resp2 = await supertest(app).post("/api/blogs").send(blogsToAdd[1]);
    assert.strictEqual(resp2.status, 400);
  });
  after(async () => {
    await mongoose.connection.close();
  });
});
