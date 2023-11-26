const jwt = require('jsonwebtoken')
const User = require('../Model/User')

const requireAuth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return next(res.status(400).json({message: "No auth header provided..."}))
        }
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        if(!token){
            return next(res.status(400).json({message: "No token provided..."}))
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                return res.status(401).json({message: "Invalid Token"})
            }else{
                next()
            }
        })
    }catch(err){
        return next(res.status(500).json({err: err.message}))
    }
}