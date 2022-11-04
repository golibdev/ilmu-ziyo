const { Router } = require('express')
const router = Router();
const { summaryController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/', verifyAdminToken, summaryController.summary)

module.exports = router