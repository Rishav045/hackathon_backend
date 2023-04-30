const express = require('express')
const router= express.Router();
const {runPrompt1}= require('../controllers/OpenAI.js')

router.route('/').post(runPrompt1);



module.exports= router 