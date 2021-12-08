const bcrypt = require('bcrypt')
const helper = require('../utils/list_helper')
const User = require('../models/user')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('test add new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('admin', 10)
        const user = new User({
            username: 'admin',
            name: 'teacher',
            passwordHash
        })
        await user.save()
    })

    test('create new user', async () => {
        const original = await helper.checkUserInDB()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const afterChange = await helper.checkUserInDB()
        expect(afterChange).toHaveLength(original.length + 1)

        const usernames = afterChange.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Exists username', async () => {
        const original = await helper.checkUserInDB();
        const newUser = {
            username: 'admin',
            name: 'Howard',
            password: '12345678',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const afterChange = await helper.checkUserInDB();
        expect(afterChange).toHaveLength(original.length);

        const names = afterChange.map(u => u.name);
        expect(names).not.toContain(newUser.name);
    });

    test ('Too short password', async () => {
        const original = await helper.checkUserInDB();
        const newUser = {
            username: 'e1900281',
            name: 'Howard',
            password: 'xy',
        };

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

        const afterChange = await helper.checkUserInDB();
        expect(afterChange).toHaveLength(original.length);

        const names = afterChange.map(u => u.name);
        expect(names).not.toContain(newUser.name);
    });
})

afterAll(() => {
    mongoose.connection.close();
});
