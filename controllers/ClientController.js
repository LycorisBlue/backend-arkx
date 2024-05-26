const express = require('express');
const router = express.Router();

const service = 'client';

//router
const new_client = require('../routes/' + service + '/new_client');
const sign_in = require('../routes/' + service + '/sign_in');
const update_infos = require('../routes/' + service + '/update_infos');
const delete_client = require('../routes/' + service + '/delete_client');
const disable_client = require('../routes/' + service + '/disable_client');



router.use('/new_client', new_client);
router.use('/sign_in', sign_in);
router.use('/update_infos', update_infos);
router.use('/delete_client', delete_client);
router.use('/disable_client', disable_client);


module.exports = router;