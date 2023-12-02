const express = require('express')
const Db_Connnection = require('./utils/Connection')
const AuthRouter = require('./Routes/AuthRouter')
const UserRouter = require('./Routes/UserRouter')
const ProfileRouter = require('./Routes/Profile')
const LikesRoutes = require('./Routes/LikesRoutes')
const ChatRouter = require('./Routes/ChatRouter')
const MessageRouter = require('./Routes/MessageRouter')
const cors = require('cors')
var bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
    origin: '*'
}))
app.use(express.json())

Db_Connnection()

app.use("/api/auth", AuthRouter)
app.use("/api/user", UserRouter)
app.use("/api/profile", ProfileRouter)
app.use("/api/profile/social", LikesRoutes)
app.use("/api/chat", ChatRouter)
app.use("/api/message", MessageRouter)

app.listen(5000, ()=>{
    console.log(`Server running on: http://localhost:${5000}`);
})