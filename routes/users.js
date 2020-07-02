const router = require('express').Router();
const helpers = require('../helpers/users');
const verify = require('../middleware/verifyToken');

router.route('/')
.post(helpers.createUser)
.get(verify, helpers.getUser)
.delete(verify, helpers.deleteUser)

module.exports = router;
