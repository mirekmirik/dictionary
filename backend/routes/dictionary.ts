import { Router } from "express"
const router = Router()
const { addMarked, getMarked, addRecents, getRecents, deleteRecents } = require('../controllers/dictionary')
const { authValidate } = require('../middlewares/authValidate')



router.route('/addMarked').post(authValidate, addMarked);
router.route('/getMarked').post(authValidate, getMarked);
router.route('/addRecents').post(authValidate, addRecents)
router.route('/getRecents').post(authValidate, getRecents)
router.route('/deleteRecents/:login/:word').delete(authValidate, deleteRecents)


module.exports = router;