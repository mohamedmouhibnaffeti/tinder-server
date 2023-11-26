const express = require('express')
const Db_Connnection = require('./utils/Connection')
const AuthRouter = require ('./Routes/AuthRouter')

const app = express()

app.use(express.json())

Db_Connnection()

app.use("/api/auth", AuthRouter)

app.listen(3000, ()=>{
    console.log(`Server running on: http://localhost:${3000}`);
})