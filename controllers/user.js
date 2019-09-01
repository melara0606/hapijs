const users = require('../models').users;

function register (request, h)  {
  return h.view('register', {
    title: 'Registro'
  });
}

async function createUser(request, h) {
  let result;
  try {
    result = await users.create(request.payload)
  } catch (error) {
    console.error(error);
    return h.response('Problema creando el usuario').code(500);
  }

  return h.response(`Usuario creado ID: ${result}`);
}

module.exports = {
  register, 
  createUser
}