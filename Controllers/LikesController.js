const Profile = require('../Model/Profile')

module.exports.LikeUser = async(req, res) => {
    try{
        const targetEmail = req.query.targetEmail
        const { currentEmail } = req.body
        const likedUser = await Profile.findOne({ email: targetEmail })
        if(!likedUser){
            return res.status(400).json({message: "No user to like with provided email..."})
        }
        //like user
        const updatedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {likedUsers: targetEmail}}, {new: true})
        if(!updatedProfile){
            return res.status(400).json({message: "Error Liking user..."})
        }
        //checking for matches
        if(likedUser.likedUsers.includes(currentEmail)){
            const MatchedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {likedUsers: targetEmail}}, {new: true})
            const MatchedProfile1 = await Profile.findOneAndUpdate({ email: targetEmail }, { $addToSet: {likedUsers: currentEmail}}, {new: true})
            if(MatchedProfile && MatchedProfile1){
                return res.status(202).json({message: `Matched with user of email ${targetEmail}...`})
            }
        }
        return res.status(200).json({message: "Liked user with"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.SuperLikeUser = async(req, res) => {
    try{
        const targetEmail = req.query.targetEmail
        const { currentEmail } = req.body
        const superlikedUser = await Profile.findOne({ email: targetEmail })
        if(!superlikedUser){
            return res.status(400).json({message: "No user to super like with provided email..."})
        }
        //like user
        const updatedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {superLikedUsers: targetEmail}}, {new: true})
        if(!updatedProfile){
            return res.status(400).json({message: "Error super Liking user..."})
        }
        //checking for matches
        if(likedUser.superLikedUsers.includes(currentEmail)){
            const MatchedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {likedUsers: targetEmail}}, {new: true})
            const MatchedProfile1 = await Profile.findOneAndUpdate({ email: targetEmail }, { $addToSet: {likedUsers: currentEmail}}, {new: true})
            if(MatchedProfile && MatchedProfile1){
                return res.status(202).json({message: `Matched with user of email ${targetEmail}...`})
            }
        }
        return res.status(200).json({message: "super Liked user..."})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetMatches = async(req, res) => {
    try{
        const {email} = req.body
        const ProfileMatches = await Profile.findOne({ email: email })
        if(!ProfileMatches){
            return res.status(400).json({message: "no user with provided email..."})
        }
        return res.status(200).json({message: ProfileMatches.matches})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetLikes = async(req, res) => {
    try{
        const {email} = req.body
        const ProfileLikes = await Profile.findOne({ email: email })
        if(!ProfileLikes){
            return res.status(400).json({message: "no user with provided email..."})
        }
        return res.status(200).json({message: ProfileLikes.likedUsers})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetSuperLikes = async(req, res) => {
    try{
        const {email} = req.body
        const ProfileSuperLikes = await Profile.findOne({ email: email })
        if(!ProfileSuperLikes){
            return res.status(400).json({message: "no user with provided email..."})
        }
        return res.status(200).json({message: ProfileSuperLikes.superLikedUsers})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}