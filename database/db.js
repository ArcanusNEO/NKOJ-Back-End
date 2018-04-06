const pool = require('./init')
const format = require('sprintf-js').vsprintf
const sessionStore = require('../lib/session-store')
const db = {}

db.pool = () => pool

db.query = (text, params) => {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    'use strict'
    pool.query(text, params, (err, res) => {
      'use strict'
      const end = Date.now() - start
      if (err) {
        console.log(`Database query ${format(text, params)} failed in ${end} ms`)
        console.log(err)
        reject(err)
      } else {
        console.log(`Database query ${format(text, params)} finished in ${end} ms`)
        resolve(res)
      }
    })
  })
}

db.splitEmail = email => {
  'use strict'
  const arr = email.toLowerCase().split('@')
  const a = arr.pop()
  const b = arr.join('@')
  return [b, a]
}

db.postLogin = (info, req, res) => {
  'use strict'
  req.session.user = info.user_id
  req.session.permission = info.perm
  req.session.nickname = info.nickname
  req.session.save()
  delete info.password
  sessionStore.login(info.user_id, req.session.id)
  res.ok(info)
  // hash[new Date] = req.sessionID
  // if(Object.keys(hash).length > 5) delete hash[Object.keys(hash).sort()[0]]
  // const arr = Object.assign({}, hash)
  // for (let o in arr) {
  //   if (arr.hasOwnProperty(o)) {
  //     (key => {
  //       sessionStore.get(hash[key], function (err, res) {
  //         if(err || !res) delete hash[key]
  //         delete arr[key]
  //         if(Object.keys(arr).length === 0){
  //           db.query('UPDATE users SET login_hash = $1 WHERE user_id = $2', [hash, info.user_id])
  //         }
  //       })
  //     })(o)
  //   }
  // }
}

db.checkName = async (name) => {
  'use strict'
  let result = await db.query('SELECT nick_id FROM user_nick WHERE lower(nickname) = lower($1) LIMIT 1', [name])
  if (result.rows.length > 0) {
    result = await db.query('SELECT user_id FROM user_info WHERE nick_id = $1 LIMIT 1', [result.rows[0].nick_id])
    if (result.rows.length > 0) return [{name: 'nickname', message: 'is being used'}]
    return [{name: 'nickname', message: 'has been used'}]
  }
  return false
}

db.checkEmail = async (email) => {
  'use strict'
  const result = await db.query('SELECT nickname FROM users WHERE email = lower($1) LIMIT 1', [email])
  if (result.rows.length > 0) {
    const nickname = result.rows[0].nickname
    return [{name: 'email', message: `taken by someone like ${nickname}`}]
  }
  return false
}

db.joinQueryArr = (key) => {
  'use strict'
  const arr = []
  arr.push(key.join(', '))
  arr.push(arr.map(function (k, i) {return '$' + (i + 1)}).join(','))
  return arr
}

module.exports = db
