var adminController = require('../controllers/admin.controller');
var express = require('express');
var router = express.Router();

router.get('/admin', adminController.adminLogin);
router.post('/admin/vol', adminController.addVolunteer);
router.get('/admin/vol', adminController.showAllVolunteer);

module.exports = router;
