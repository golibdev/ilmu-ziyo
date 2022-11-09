const { Router } = require('express')
const router = Router();
const { serviceController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.post('/', verifyAdminToken, serviceController.create);
router.put('/:id', verifyAdminToken, serviceController.update);

module.exports = router