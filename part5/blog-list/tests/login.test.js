const mongoose = require('mongoose');
const supertest = require('supertest');
const listHelper = require ('../utils/list_helper');
const bcrypt = require ('bcrypt');
const User = require ('../models/user');
const jwt = require ('jsonwebtoken');

const app = require('../app');
const api = supertest(app);

describe('Test login', () => {
    beforeEach(async () =>  {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('admin', 10)
        const user = new User({
            username: 'admin',
            name: 'teacher',
            passwordHash
        })
        await user.save()
    })
    test('Login', async () => {
        const newLogin = listHelper.sampleObject('login')
        await api
        .post('/api/login')
        .send(newLogin)
        .expect('Content-Type', /application\/json/)
    })
    test('Wrong password', async () => {
        const rightLogin = listHelper.sampleObject('login');
        const wrongLogin = {
            ...rightLogin,
            password: 'NoPassword'
        }
        await api
            .post('/api/login')
            .send(wrongLogin)
            .expect(401);
    });
})

describe('401 error', () => {
    test('Verify adding blog with the given token', async () => {
        const sampleBlog = await listHelper.sampleObject();

        const userList = await listHelper.checkUserInDB();
        const desiredUser = userList.filter(obj => obj.username === "admin")
        
        await api
            .post('/api/blogs')
            .send(sampleBlog)
            .expect(401)

        const anotherResponse = await listHelper.checkBlogInDB();

        const titleMap = anotherResponse.map(blog => blog.title);

        expect(titleMap).not.toContain('Sample');
        expect(anotherResponse).toHaveLength(listHelper.listWithOneBlog.length);

        const finalList = await listHelper.checkUserInDB();
        const desiredUserAgain = finalList.filter(obj => obj.username === "admin")
        expect(desiredUserAgain[0].blogs).toHaveLength(desiredUser[0].blogs.length)
    });
})
afterAll(() => {
  mongoose.connection.close();
});
