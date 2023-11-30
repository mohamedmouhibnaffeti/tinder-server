const Profile = require('../Model/Profile')
const { validate } = require('react-email-validator')
const User = require('../Model/User')

module.exports.CreateProfile = async(req, res) => {
    const { firstname, lastname, birthday, gender, showme, aboutme, images, email } = await req.body
    if(!validate(email)){
        return res.status(400).json({message: "Invalid email address..."})
    }
    try{
        const ProfileExists = await Profile.findOne({email})
        if(ProfileExists){
            return res.status(400).json({ message: `Profile with email ${email} already exists in database` })
        }
        const ProfileCreated = await Profile.create({ firstname, lastname, birthday, gender, showme, aboutme, images, email })
        if(!ProfileCreated){
            return res.status(400).json({ message: "Please verify your data..." })
        }
        return res.status(201).json({ message: ProfileCreated })
    }catch(err){
        res.status(500).json({Error: err.message})
    }
}

module.exports.UpdateProfile = async(req, res) => {
    const { firstname, lastname, birthday, gender, showme, aboutme, images, email, oldEmail } = await req.body
    if(!validate(email) && email){
        return res.status(400).json({message: "Invalid email address..."})
    }
    try{
        const ProfileUpdated = await Profile.findOneAndUpdate({ email: oldEmail }, {firstname, lastname, birthday, gender, showme, aboutme, images, email}, {new: true})
        if(email){
            const UpdatedUser = await User.findOneAndUpdate({email: oldEmail}, {email})
            if(!UpdatedUser){
                res.status(400).json({message: "error updating user"})
            }
        }
        if(!ProfileUpdated){
            return res.status(400).json({message: "Error updating profile"})
        }
        res.status(202).json({ message: "User updated successfully" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.MyProfile = async(req, res) => {
    const email = req.query.email
    console.log('email :>> ', email);
    try{
        const MyProfile = await Profile.findOne({email})
        if(!MyProfile){
            return res.status(400).json({message : "No profile found for the given email..."})
        }
        return res.status(200).json({Profile: MyProfile})
    }catch(err){
        return res.status(500).json({message: err.message })
    }
}

