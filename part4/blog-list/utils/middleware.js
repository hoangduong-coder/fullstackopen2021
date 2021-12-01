const logger = require('./logger');
const User = require('../models/user');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  logger.info('Token:  ', request.token)
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    )
    const user = await User.findById(decodedToken.id)
    request.user = user
  } else {
    request.user = null;
  }
  logger.info('User:  ', request.user);
  next()
}

const unknownEndpoint =(request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler =(error, request, response, next) => {
  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'invalid token'})
  }
  logger.error(error.message);
  next(error);
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}
