const router = require('express').Router();
const Authentication = require('../authentication/authentication');
const Admin = require('../controller/admin');
const Common = require('../controller/common');

//Users
router.post('/login', Common.login);

//Food Traceability 
router.post('/viewProduct', Common.get_product_information);
router.post('/updateMessage',Authentication, Admin.update_product_safety_message);


module.exports = router;



router.post('/register', Authentication, Admin.register_user);