const express = require('express')
const Db_Connnection = require('./utils/Connection')
const AuthRouter = require('./Routes/AuthRouter')
const UserRouter = require('./Routes/UserRouter')
const ProfileRouter = require('./Routes/Profile')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: '*'
}))
app.use(express.json())

Db_Connnection()

app.use("/api/auth", AuthRouter)
app.use("/api/user", UserRouter)
app.use("/api/profile", ProfileRouter)

app.listen(5000, ()=>{
    console.log(`Server running on: http://localhost:${5000}`);
})