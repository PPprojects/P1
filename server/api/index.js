const router = require('express').Router()

router.use('/employees', require('./employee'))
router.use('/departments', require('./department'))

module.exports = router
