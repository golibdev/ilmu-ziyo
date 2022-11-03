const { Router } = require('express')
const router = Router();
const { adminController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.post('/login', adminController.login);
router.post('/update/:id', verifyAdminToken, adminController.update);

module.exports = router