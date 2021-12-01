const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware')
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
    .then(() => {
        logger.info('Connect to MongoDB')
    })
    .catch(error => {
        logger.error('Error:', error.message)
    })

app.use(cors());
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
