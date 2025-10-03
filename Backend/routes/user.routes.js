const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage("Enter a valid email"),

    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body('password')
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post('/login',[
  body('email')
  .isEmail()
  .withMessage("Enter a valid email"),
  body('password')
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long"),
],
userController.loginUser
 );

 router.get('/profile',authmiddleware.authUser, userController.getUserProfile);
  
router.get('/logout', authmiddleware.authUser, userController.logoutUser);  

module.exports = router;
