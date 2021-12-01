const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
    const userList = await User.find({}).populate('blogs')
    res.json(userList)
})

userRouter.post('/', async (req, res) => {
    const body = req.body
    if(body.password.length < 3) {
        return res.status(400).json({error: 'Password length must greater than 2'})
    } else {
        const passwordHash = await bcrypt.hash(body.password, 10)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        res.json(savedUser)
    }
})

module.exports = userRouter