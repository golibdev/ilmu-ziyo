const { Router } = require('express');
const router = Router();

router.use('/admin', require('./adminRoutes'))
router.use('/course', require('./courseRoutes'))
router.use('/student', require('./studentRoutes'))
router.use('/summary', require('./summaryRoute'))

module.exports = router;
