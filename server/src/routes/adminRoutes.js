const { Router } = require('express')
const router = Router();
const { adminController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/get-my-data', verifyAdminToken, adminController.getMyData)
router.post('/login', adminController.login);
router.put('/update', verifyAdminToken, adminController.update);

module.exports = router