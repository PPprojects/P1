const router = require('express').Router()

router.use('/employee', require('./employee'))
router.use('/department', require('./department'))

module.exports = router
