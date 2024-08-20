const blogsRouter = require("express").Router();
const Blog = require("../models/blogSchema");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "title and url need to be set" });
  }

  const blog = new Blog(request.body);

  result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
