const express = require('express')
const studentController =require ('../controller/student')
const route = express.Router()
route.post('/createStudent',studentController.createStudent)

module.exports = router