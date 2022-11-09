const { Router } = require('express')
const router = Router();
const { userController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/', verifyAdminToken, userController.getAll)
router.get('/get-all', verifyAdminToken, userController.getAllNoPage)
router.get('/:id', verifyAdminToken, userController.getOne)
router.post('/register', userController.register)

module.exports = router