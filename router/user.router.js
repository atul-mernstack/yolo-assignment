const express =  require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const user = new userController();
const Authmodule = require('../auth/user.auth')
const Auth =  new Authmodule();

router.route('/login').post(user.userLogin);
router.route('/register').post(user.userRegister);
router.route('/user').get(Auth.isAuth,user.userDetails)
router.route('/update').put(Auth.isAuth,user.userUpdate)
//.patch()
router.route('/delete').delete(Auth.isAuth,user.userDelete)
router.route('/logout').get(Auth.isAuth,user.userLogout)
module.exports = router;
