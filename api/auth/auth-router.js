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

router.post('/login', checkUsernameExists, async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await Users.findBy({username})
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
     return next({ status: 401, message: "Invalid credentials"})
    }
    req.session.user = user
    res.status(200).json({ message: `Welcome ${user.username}!`})
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  if(!req.session.user) {
    next({ status: 200, message: "no session"})
  } else {
    req.session.destroy((err) => {
      if (err) {
        next({ status: 500, message: "Something went wrong trying to logout"})
      } else {
        res.status(200).json({ message: "logged out"})
      }
    })
  }
})
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
