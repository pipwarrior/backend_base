const router = require('express').Router();
const helpers = require('../helpers/inventory');
const verify = require('../middleware/verifyToken');
const verifyIsAdmin = require('../middleware/verifyIsAdmin');

router.route('/')
.post(verifyIsAdmin, helpers.createInventory)
.get(verify, helpers.getInventorys)
.patch(verifyIsAdmin, helpers.patchInventory)
.delete(verifyIsAdmin, helpers.deleteInventory)

module.exports = router;
