const Profile = require('../Model/Profile')
const { validate } = require('react-email-validator')
const User = require('../Model/User')

function validateAge(birthday) {
    const currentdate = new Date();
    const eighteenYearsAgo = new Date(currentdate.getFullYear() - 18, currentdate.getMonth(), currentdate.getDate());
    const date = new Date(birthday);
    return date <= eighteenYearsAgo;
}

function validateMaxAge(birthday) {
    const currentdate = new Date();
    const eightyYearsAgo = new Date(currentdate.getFullYear() - 80, currentdate.getMonth(), currentdate.getDate());
    const date = new Date(birthday);
    return date >= eightyYearsAgo;
}


module.exports.CreateProfile = async(req, res) => {
    const { firstname, lastname, birthday, gender, showme, aboutme, images, email, Location } = await req.body
    if(!validate(email)){
        return res.status(400).json({message: "Invalid email address..."})
    }
    if(!validateAge(birthday)){
        return res.status(400).json({message: "Invalid Age, you must be older than 18 years..."})
    }
    if(!validateMaxAge(birthday)){
        return res.status(400).json({message: "Invalid Age, you must be younger than 80 years..."})
    }
    if(gender === showme){
        return res.status(400).json({message: "Please select a gender different to your actual gender..."})
    }
    if(images.length < 2 || images.length > 10 ){
        return res.status(400).json({message: "Please Insert minimum of 2 Images..."})
    }
    try{
        const ProfileExists = await Profile.findOne({email})
        if(ProfileExists){
            return res.status(400).json({ message: `Profile with email ${email} already exists in database` })
        }
        const ProfileCreated = await Profile.create({ firstname, lastname, birthday, gender, showme, aboutme, images, email, Location })
        if(!ProfileCreated){
            return res.status(400).json({ message: "Please verify your data..." })
        }
        return res.status(201).json({ message: ProfileCreated })
    }catch(err){ 
        res.status(500).json({Error: err.message})
    }
}

module.exports.UpdateProfile = async(req, res) => {
    const { firstname, lastname, birthday, gender, showme, aboutme, images, email, oldEmail, Location, phone } = await req.body
    if(!validate(email) && email){
        return res.status(400).json({message: "Invalid email address..."})
    }
    try{
        const ProfileUpdated = await Profile.findOneAndUpdate({ email: oldEmail }, {firstname, lastname, birthday, gender, showme, aboutme, images, email, Location, phone}, {new: true})
        if(email){
            const UpdatedUser = await User.findOneAndUpdate({email: oldEmail}, {email})
            if(!UpdatedUser){
                res.status(400).json({message: "error updating user"})
            }
        }
        if(!ProfileUpdated){
            return res.status(400).json({message: "Error updating profile"})
        }
        return res.status(202).json({ message: "User updated successfully" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.MyProfile = async(req, res) => {
    const email = req.query.email
    try{
        const MyProfile = await Profile.findOne({email})
        if(!MyProfile){
            return res.status(400).json({message : `No profile found for the email ${email}...`})
        }
        return res.status(200).json({Profile: MyProfile})
    }catch(err){
        return res.status(500).json({message: err.message })
    }
}

module.exports.getProfilesByGender = async (req, res) => {
    try {
        const { gender } = req.query;
        const { likedUsers, superLikedUsers } = req.body;

        const ProfilesFetched = await Profile.aggregate([
            {
                $match: {
                    gender: gender,
                    email: { $nin: [...likedUsers, superLikedUsers] },
                },
            },
            { $sample: { size: 200 } },
        ]);

        if (!ProfilesFetched || ProfilesFetched.length === 0) {
            return res.status(400).json({ message: `No profiles found with the gender: ${gender}` });
        }

        return res.status(200).json({ Profiles: ProfilesFetched });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

