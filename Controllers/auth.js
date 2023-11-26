const User = require ("../Model/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 3 * 24
const create_token = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.Register = async (req, res) => {
    const { email, password, confirmPassword } = await req.body
    if(!email || !password || !confirmPassword){
        return res.status(400).json({message: "Please verify your fields... password, email and ConfirmPassword are required", body: req.body})
    }
    if(password !== confirmPassword){
        return res.status(400).json({message: "Password and confirm password must be equal"})
    }
    if( password.length < 6 ) {
        return res.status(400).json({message: "Password must be longer than 6 caracters"})
    }
    try{
        const UserExists = await User.findOne({email})
        if(UserExists){
            return res.status(400).json({message: 'User already exists in database...'})
        }
        const UserCreated = await User.create({email, password})
        res.status(201).json({message: 'User Created Successfully.', User: UserCreated})
    }catch(err){
        res.status(400).json({message: 'User creation not successful', Error: err.message})
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
            res.cookie('TinderJWT', token, { maxAge: maxAge })
            res.status(200).json({message: "Login Successful", token: token})
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