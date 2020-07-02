const router = require('express').Router();
const helpers = require('../helpers/auth');

router.route('/login')
.post(helpers.login)

router.route('/tokenIsValid')
.post(helpers.tokenIsValid)

module.exports = router;