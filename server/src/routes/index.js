const { Router } = require('express');
const router = Router();

router.use('/admin', require('./adminRoutes'))
router.use('/course', require('./courseRoutes'))
router.use('/service', require('./serviceRoutes'))
router.use('/student', require('./studentRoutes'))
router.use('/summary', require('./summaryRoute'))
router.use('/user', require('./userRoutes'))

module.exports = router;
