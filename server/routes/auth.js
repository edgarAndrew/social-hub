const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {register,login,logout} = require('../controllers/auth');

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').get(authMiddleware,logout)

module.exports = router;