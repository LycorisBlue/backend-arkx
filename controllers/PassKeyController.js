const express = require('express');
const router = express.Router();

const service = 'key';

//router
const add_key = require('../routes/' + service + '/add_key');
const disable_key = require('../routes/' + service + '/disable_key');




router.use('/add_key', add_key);
router.use('/disable_key', disable_key);


module.exports = router;