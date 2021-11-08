const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { checkUsernameFree, 
checkUsernameExists,
checkPasswordLength
} = require('./auth-middleware')
const Users = require('../users/users-model')

router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    const newUser = { username, password: hash}
    const userId = await Users.add(newUser)
    const user = await Users.findById(userId)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
module.exports = router
