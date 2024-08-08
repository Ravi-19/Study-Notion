const router = require('express').Router();
const courseRoute = require('./course.js');
const paymentsRoute = require('./payments.js');
const profileRoute = require('./profile.js');
const userRoute = require('./user.js') ; 

router.use('/course', courseRoute);
router.use('/payments', paymentsRoute);
router.use('/profile', profileRoute);
router.use('/auth', userRoute); 

module.exports = router  ;  