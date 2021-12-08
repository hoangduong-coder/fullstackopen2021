const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    // for (let blog of listHelper.listWithOneBlog) {
    //     let newBlog = new Blog(blog)
    //     await newBlog.save()
    // }
    await Blog.insertMany(listHelper.listWithOneBlog)
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('admin', 10)
    const user = new User({
        username: 'admin',
        name: 'teacher',
        passwordHash
    })
    await user.save()
})

describe('test get method', () => {
    test('list of blogs', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/);
    });

    test('verify unique id property', async () => {
        const res = await api.get('/api/blogs');
        expect(res.body[0].id).toBeDefined();
    });
})

describe('test post blog', () => {
    test('Verify adding blog with the given token', async () => {
        const newLogin = await listHelper.sampleObject('login')
        const newUser = await api
            .post('/api/login')
            .send(newLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const sampleBlog = await listHelper.sampleObject()
        const desired = {
            ...sampleBlog,
            user: newUser._id
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${newUser.body.token}`)
            .send(desired)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const anotherResponse = await listHelper.checkBlogInDB();

        const titleMap = anotherResponse.map(blog => blog.title)

        expect(titleMap).toContain('Sample');
        expect(anotherResponse).toHaveLength(listHelper.listWithOneBlog.length + 1)
    });
})

describe('Other test', () => {
    test('Number of Likes equal 0', async () => {
        const newBlog = await listHelper.sampleObject()
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await listHelper.checkBlogInDB()
        const newBlogLikes = result.body.find(blog => blog.title === newBlog.title)
        expect(newBlogLikes.likes).toEqual(0)
    })
    test('No title and url', async () => {
        const newBlog = {
            author: 'abcxyz',
            likes: 2,
        };
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });
})

describe('test delete and put method', () => {
    test('Delete an object', async () => {
        const newLogin = await listHelper.sampleObject('login')
        const newUser = await api
            .post('/api/login')
            .send(newLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const sampleBlog = await listHelper.sampleObject()
        const desired = {
            ...sampleBlog,
            user: newUser._id
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${newUser.body.token}`)
            .send(desired)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const original = await listHelper.checkBlogInDB();
        const userList = await listHelper.checkUserInDB();

        const noteToDelete = original.find(blog => blog.title === "Sample");
        const selectedUser = userList.find(user => user.username === "admin");

        await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .set('Authorization', `bearer ${newUser.body.token}`)
        .expect(204);

        const afterChange = await listHelper.checkBlogInDB();
        expect(afterChange).toHaveLength(original.length - 1);
        
        const userAfterChange = await listHelper.checkUserInDB();
        const deleteNoteOwner = userAfterChange.find(user => user.id === noteToDelete.user.toString());
        expect(deleteNoteOwner.blogs).toHaveLength(selectedUser.blogs.length - 1)
    });

    test('Update an object', async () => {
        const newBlog = await listHelper.sampleObject()
        await api
            .post('/api/blogs')
            .send(newBlog)

        const original = await listHelper.checkBlogInDB()
        const noteToUpdate = original.find(blog => blog.title === newBlog.title)

        await api
        .put(`/api/blogs/${noteToUpdate.id}`)
        .send({'likes': 100})
        .expect(200)

        const afterChange = await listHelper.checkBlogInDB()
        const noteAfterUpdate = afterChange.find(blog => blog.id === noteToUpdate.id);
        expect(noteAfterUpdate.likes).toEqual(100)
    });
})

afterAll(() => {
    mongoose.connection.close()
})