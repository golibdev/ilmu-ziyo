const { Router } = require('express')
const router = Router();
const { courseController } = require('../controllers');
const { verifyAdminToken } = require('../middleware/adminTokenHandler')

router.get('/', courseController.getAll);
router.get('/:id', courseController.getOne);
router.post('/', verifyAdminToken, courseController.create);
router.put('/:id', verifyAdminToken, courseController.update);

module.exports = router