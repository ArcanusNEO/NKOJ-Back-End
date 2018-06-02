const router = require('express').Router()
const contest = require('./admin_contest')
const email = require('./admin_email')
const role = require('./admin_role')
const user = require('./admin_user')
const problem = require('./admin_problem')
const upload = require('./admin_upload')
const rank = require('../rank')
const {require_perm, MANAGE_ROLE, SUPER_ADMIN, EDIT_CONTEST_ALL} = require('../../lib/permission')

router.use('/contest', require_perm(EDIT_CONTEST_ALL), contest)
router.use('/email', require_perm(SUPER_ADMIN), email)
router.use('/role', require_perm(MANAGE_ROLE), role)
router.use('/user', require_perm(MANAGE_ROLE), user)
router.use('/rank', rank)
router.use('/problem', problem)
router.use('/upload', upload)

module.exports = router
