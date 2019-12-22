var userController = require('../controllers/user.controller');
var express = require('express');
var router = express.Router();

router.post('/user', userController.signUpUser);
router.get('/user', userController.login);
router.get('/user/mail', userController.forgetPassword);


module.exports = router;

// module.exports = () =>{
//     console.log('route');
//     router.post('/user', userController.signUpUser);
//     router.get('/user', (req, res)=>{
//         console.log('hello')
//     });
// }