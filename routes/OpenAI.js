const express = require('express')
const router= express.Router();
const {runPrompt1,train}= require('../controllers/OpenAI.js')

router.route('/').post(runPrompt1);
router.route('/trains').post(train);



module.exports= router 