const router = require('express').Router()
const db = require('../database/db')
const fs = require('fs')
const fc = require('../lib/form-check')
const {CONTEST_PATH} = require('../config/basic')

router.get('/:cid', fc.all(['cid']), async (req, res) => {
  'use strict'
  const cid = req.fcResult.cid

  const result = await db.query(
    'SELECT *, lower(during) AS start, upper(during) AS end FROM contests WHERE contest_id = $1', [cid]
  )
  if (result.rows.length === 0) return res.fail(404)

  const basic = result.rows[0]

  const problems = await db.query(
    'SELECT problem_id, submit_ac as ac, submit_all as all, title, special_judge, detail_judge, level' +
    ' FROM contest_problems NATURAL JOIN problems WHERE contest_id = $1', [cid]
  )

  let file
  try {
    file = fs.readFileSync(`${CONTEST_PATH}/${cid}.md`, 'utf8')
  } catch (e) {

  }
  res.ok({...basic, problems: problems.rows, file})
})

router.get('/:cid/finished', fc.all(['cid']), async (req, res) => {
  'use strict'
  const cid = req.fcResult.cid

  const result = await db.query(
    'SELECT *, lower(during) AS start, upper(during) AS end FROM contests WHERE contest_id = $1', [cid]
  )
  if (result.rows.length === 0) return res.fail(404)

  const basic = result.rows[0]

  const problems = await db.query(
    'SELECT problem_id, submit_ac as ac, submit_all as all, title, special_judge, detail_judge, level' +
    ' FROM contest_problems LEFT JOIN problems WHERE contest_id = $1', [cid]
  )

  let file
  try {
    file = fs.readFileSync(`${CONTEST_PATH}/${cid}.md`, 'utf8')
  } catch (e) {

  }
  res.ok({...basic, problems: problems.rows, file})
})

router.get('/:cid/user', fc.all(['cid']), async (req, res) => {
  'use strict'
  const cid = req.fcResult.cid
  const result = await db.query('SELECT * FROM contest_users WHERE contest_id = $1', [cid])
  res.ok(result.rows)
})

router.get('/:cid/first_ac_all',fc.all(['cid']),async (req,res)=>{
    'use strict'
    const cid = req.fcResult.cid
    const result = await db.query('SELECT * FROM user_solutions WHERE solution_id IN (SELECT min(solution_id) FROM solutions WHERE contest_id = $1 AND status_id = 107 GROUP BY problem_id ORDER BY min(solution_id))', [cid])
    res.ok(result.rows)
})

module.exports = router
