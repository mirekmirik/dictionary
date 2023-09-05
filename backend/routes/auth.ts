import { Router } from "express"
const router = Router()
const { register, login, profile } = require('../controllers/auth')
const { authValidate } = require('../middlewares/authValidate')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(authValidate, profile)


module.exports = router