const express = require('express');
const router = express.Router();

const service = 'restaurant';

//router
const new_restaurant = require('../routes/' + service + '/new_restaurant');
const update_infos = require('../routes/' + service + '/update_infos');



router.use('/new_restaurant', new_restaurant);
router.use('/update_infos', update_infos);


module.exports = router;