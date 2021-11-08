const db = require('../../data/db-config')

async function find() {
  const result = await db('users').select('user_id', 'username').orderBy('user_id')
  return result
}

async function findBy(filter) {
  const [result] = await db('users').where(filter).orderBy('user_id')
  return result
}

async function findById(user_id) {
  const result = await db('users').where('user_id', user_id).select('user_id', 'username').first()
  return result 
}

async function add(user) {
  const result = await db('users').insert(user)
  return result
}

module.exports = {
  find,
  findBy,
  findById,
  add
}
