const Joi = require('@hapi/joi');
const site = require('./controllers/site');
const user = require('./controllers/user');

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: site.home
  }, 
  {
    path: '/register',
    method: 'GET',
    handler: user.register
  }, 
  {
    path: '/crear-usuario',
    method: 'POST',
    options: {
      validate: {
        payload: {
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }
      }
    },
    handler: user.createUser
  },
  {
    path: '/login',
    method: 'GET',
    handler: user.login
  },
  {
    path: '/valid-user',
    method: 'POST',
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }
      }
    },
    handler: user.validUser
  },
  {
    path: '/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path : '.',
        index: 'index.html'
      }
    }
  }
]