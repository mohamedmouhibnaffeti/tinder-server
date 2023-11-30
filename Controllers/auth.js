const User = require ("../Model/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validate } = require('react-email-validator')

const maxAge = 60 * 60 * 24 * 3
const create_token = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.Register = async (req, res) => {
    const { email, password, confirmPassword } = await req.body
    if(!email || !password || !confirmPassword){
        return res.status(400).json({message: "Please verify your fields...", body: req.body})
    }
    if(password !== confirmPassword){
        return res.status(400).json({message: "Password and confirm password must be equal"})
    }
    if( password.length < 6 ) {
        return res.status(400).json({message: "Password must be longer than 6 caracters"})
    }
    if(!validate(email)){
        return res.status(400).json({message: "Invalid email address"})
    }
    try{
        const UserExists = await User.findOne({email})
        if(UserExists){
            return res.status(400).json({message: 'User already exists in database...'})
        }
        const UserCreated = await User.create({email, password})
        const token = create_token(UserCreated.email)
        res.status(201).json({message: 'User Created Successfully.', token: token, Age: maxAge, status: 201 })
    }catch(err){
        res.status(400).json({message: err.message})
    }
} 

module.exports.Login = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "No user found with the given email address..."})
        }
        try{
            const auth = await bcrypt.compare(password, user.password)
            if(!auth){
                return res.status(400).json({message: "Wrong password..."})
            }
            const token = create_token(user.email)
            res.status(200).json({message: "Login Successful", token: token, Age: maxAge, status: 200})
        }catch(error){
            return res.status(500).json({Error: error.message})
        }
    }catch(err){
        return res.status(400).json({Error: err.message})
    }
}

module.exports.Logout = (req, res) =>{
    res.cookie('TinderJWT', '', {maxAge : 1})
    res.status(200).json({message: 'Logged out'})
}

module.exports.checkUser = (req, res) => {
    const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(400).json({message: "No auth header provided..."})
        }
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) =>{
            if(err){
                return res.status(401).json({message: "You're not authorized to visit this page..."})
            } else { 
                try{
                    const user = await User.findOne({email: decodedToken.id})
                    if(!user){
                        return res.status(401).json({message: "You're unothorized to visit this page..."})
                    }
                    return res.status(200).json({User: user.email})
                }catch(error){
                    res.status(500).json({message: "Internal server error"})
                }
            }
        })
    }else {
        return res.status(400).json({message: "No token provided..."})
    }
}