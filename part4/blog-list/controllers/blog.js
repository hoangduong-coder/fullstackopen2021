//contains event handlers (controllers)
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user',{ username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id || !user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog({
    ...body,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if(blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString())
    await user.save()
    res.status(204).end();
  } else {
    res.status(401).json({error: 'You can\'t delete blogs belongs to another user!'})
  }
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const changedBlog = {    
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blog = await Blog.findByIdAndUpdate(req.params.id, changedBlog, {new: true})
  res.json(blog)
})

module.exports = blogRouter