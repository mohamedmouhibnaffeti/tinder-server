const Profile = require('../Model/Profile')
const Chat = require('../Model/Chat')

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
            const MatchedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {matches: targetEmail}}, {new: true})
            const MatchedProfile1 = await Profile.findOneAndUpdate({ email: targetEmail }, { $addToSet: {matches: currentEmail}}, {new: true})
            const NewChat = await Chat.create({ 
                members: [targetEmail, currentEmail]
            })
            if(MatchedProfile && MatchedProfile1 && NewChat){
                return res.status(202).json({message: `Matched with user of email ${targetEmail}...`})
            }
        }
        return res.status(202).json({message: `Liked user with email ${targetEmail}`})
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
            const MatchedProfile = await Profile.findOneAndUpdate({ email: currentEmail }, { $addToSet: {matches: targetEmail}}, {new: true})
            const MatchedProfile1 = await Profile.findOneAndUpdate({ email: targetEmail }, { $addToSet: {matches: currentEmail}}, {new: true})
            const NewChat = await Chat.create({ 
                members: [targetEmail, currentEmail]
            })
            if(MatchedProfile && MatchedProfile1 && NewChat){
                return res.status(202).json({message: `Matched with user of email ${targetEmail}...`})
            }
        }
        return res.status(202).json({message: "super Liked user..."})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetMatches = async(req, res) => {
    try{
        const {email} = req.query
        const ProfileMatches = await Profile.findOne({ email: email })
        if(!ProfileMatches){
            return res.status(400).json({message: "Error occured.."})
        }
        if(ProfileMatches.matches.length === 0){
            return res.status(200).json({message: `No matches for the user with email ${email}`})
        }
        const UsersArray = []
        for(i=0; i<ProfileMatches.matches.length; i++){
            const match = ProfileMatches.matches[i]
            const userMatched = await Profile.findOne({ email: match })
            UsersArray.push(userMatched)
        }
        return res.status(202).json({message: UsersArray})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetLikes = async(req, res) => {
    try{
        const {email} = req.query
        const ProfileLikes = await Profile.findOne({ email: email })
        if(!ProfileLikes){
            return res.status(400).json({message: "Error occured..."})
        }
        if(ProfileMatches.likedUsers.length === 0){
            return res.status(200).json({message: `No matches for the user with email ${email}`})
        }
        const UsersArray = []
        for(i=0; i<ProfileLikes.likedUsers.length; i++){
            const like = ProfileLikes.likedUsers[i]
            const userLiked = await Profile.findOne({ email: like })
            UsersArray.push(userLiked)
        }
        return res.status(202).json({message: UsersArray})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetSuperLikes = async(req, res) => {
    try{
        const {email} = req.params
        const ProfileSuperLikes = await Profile.findOne({ email: email })
        if(!ProfileSuperLikes){
            return res.status(400).json({message: "Error occured..."})
        }
        if(ProfileSuperLikes.superLikedUsers.length === 0){
            return res.status(200).json({message: `No matches for the user with email ${email}`})
        }
        const UsersArray = []
        for(i=0; i<ProfileSuperLikes.likedUsers.length; i++){
            const SuperLike = ProfileSuperLikes.superLikedUsers[i]
            const userSuperLiked = await Profile.findOne({ email: SuperLike })
            UsersArray.push(userSuperLiked)
        }
        return res.status(202).json({message: UsersArray})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}