//?Esta aplicacion simulara una agenda de citas para reparar motos
//! Se crean 2 bases de datos

/* 
Users 
  id 
  name
  email
  password
  role
  status 
  */

/* 
repairs 
  id 
  date
  *motorsNumber 
  *description
  status 
  userId
  */

const express = require('express')
const app = express()
const routeUser = require('./routes/users.routes')
const routeRepairs = require('./routes/repairs.routes')

app.use(express.json());

// * Ruta de Users
app.use('/api/v1/users', routeUser)

// * Ruta de Repairs
app.use('/api/v1/repairs', routeRepairs)

module.exports = app