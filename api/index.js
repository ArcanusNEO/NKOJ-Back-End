const router = require('express').Router();
// const {require_perm} = require('../lib/permission');
//
// const admin = require('./admin/index');
// const avatar = require('./avatar');
// const captcha = require('./captcha');
// const contest = require('./contest');
// const contests = require('./contests');
// const danmaku = require('./danmaku');
// const message = require('./message');
// const judge = require('./judge');
// const post = require('./post');
// const posts = require('./posts');
// const problem = require('./problem');
// const problems = require('./problems');
// const test = require('./test');
// const user = require('./user/index');
// const status = require('./status');
// const version = require('./version');
//
// router.use('/admin', admin);
// router.use('/avatar', avatar);
// router.use('/c', contest); // like '/api/contest/1001', '/api/c/1001'
// // FIXME: temp workaround for mobile app
// router.use('/code', require('./code'));
// router.use('/captcha', captcha);
// router.use('/contest', contest);
// router.use('/contests', contests);
// router.use('/danmaku', danmaku);
// router.use('/message', require_perm(), message);
// router.use('/judge', require_perm(), judge);
// router.use('/p', problem); // '/api/p/1001', '/api/problem/1001'
// router.use('/post', post);
// router.use('/posts', posts);
// router.use('/problem', problem);
// router.use('/problems', problems);
// router.use('/u', user);
// router.use('/user', user);
// router.use('/status', status);
// router.use('/version', version);
//
// // DEV: test
// router.use('/test', test);
//
// router.use((req, res) => {
//   res.fatal(501);
// });

module.exports = router;