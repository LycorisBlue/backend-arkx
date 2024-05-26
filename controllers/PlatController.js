const express = require('express');
const router = express.Router();

const service = 'plat';

//router
const new_plat = require('../routes/' + service + '/new_plat');
const update_infos = require('../routes/' + service + '/update_infos');



router.use('/new_plat', new_plat);
router.use('/update_infos', update_infos);



module.exports = router;