const express =require('express')
const mentorRouter=require('./mentor')
const studentRoute=require('./student')
const router=express.Router();

router.use('/mentor',mentorRouter )
router.use('/student',studentRoute)



module.exports=route