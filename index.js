const express = require('express')

const app = express()
app.use(express.json())
const AppRoute=require('./src/route/index')
app.use('/',AppRoute)

app.listen(8000,()=>console.log("Server listening to port 8000"))


