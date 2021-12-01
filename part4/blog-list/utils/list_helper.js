const Blog = require('../models/blog')
const User = require('../models/user');

const listWithOneBlog = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(i => sum += i.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  const likesArr = [];
  blogs.map(i => likesArr.push(i.likes))
  const result = blogs.find(i => i.likes === Math.max(...likesArr))
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const checkBlogInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const mostLikes = (blogs) => {
  const likesArr = [];
  blogs.map(i => likesArr.push(i.likes));
  const result = blogs.find(i => i.likes === Math.max(...likesArr))
  return {
    author: result.author,
    likes: result.likes
  }
}
const sampleObject = async (kw) => {
  const sample = {
    title: 'Sample',
    author: 'I don\'t know',
    url: 'www.forum.fi',
  }
  if(kw === 'noExist'){
    const blog = new Blog(sample)
    await blog.save()
    await blog.remove()
    return blog._id.toString()
  } else if(kw === 'login') {
    return({
      username: 'admin',
      password: 'admin'
    })
  } else {
    return sample
  }
}

const checkUserInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON()) 
}
module.exports = { 
  dummy, totalLikes, favoriteBlog, mostLikes, listWithOneBlog, checkBlogInDB , sampleObject, checkUserInDB
}