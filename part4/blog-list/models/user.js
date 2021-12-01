const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnResult) => {
        returnResult.id = returnResult._id.toString()
        delete returnResult._id
        delete returnResult.__v
        delete returnResult.passwordHash
    }
})
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema)
module.exports = User