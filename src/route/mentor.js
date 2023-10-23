const express = require('express')
const mentorController = require('../controller/mentor')

const router = express.Router()

router.get('/creatmentor',mentorController.createMentor)


module.exports = Router
