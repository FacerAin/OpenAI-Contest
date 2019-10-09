const express=require('express');
const router=express.Router();

router.post('/cliConnection',require('./cliConnection'));
router.post('/STT',require('./STT'));

module.exports=router;