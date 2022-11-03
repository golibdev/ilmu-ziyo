const { Router } = require('express')
const router = Router();
const { studentController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/', verifyAdminToken, studentController.getAll)
router.get('/:id', verifyAdminToken, studentController.getOne)
router.post('/register', studentController.register)
router.put('/update-status/:id', verifyAdminToken, studentController.updateStatus);

module.exports = router