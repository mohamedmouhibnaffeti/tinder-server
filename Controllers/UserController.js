const Profile = require("../Model/Profile")
const User = require("../Model/User")
module.exports.deleteUser = async (req, res) => {
    const {email} = await req.query
    try{
        const deletedUser = await User.findOneAndDelete({email})
        if(!deletedUser){
            return res.status(400).json({message: "No user found with the provided email"})
        }
        const deletedProfile = await Profile.findOneAndDelete({email})
        return res.status(200).json({message: deletedUser, deletedProfile: deletedProfile})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}