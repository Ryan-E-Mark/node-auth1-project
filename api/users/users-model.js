const db = require('../../data/db-config')
/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  const result = await db('users').select('user_id', 'username').orderBy('user_id')
  return result
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const [result] = await db('users').where(filter).orderBy('user_id')
  return result
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const result = await db('users').where('user_id', user_id).first()
  return result 
}

/**
  resolves to the newly inserted user { user_id, username }
 */
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
