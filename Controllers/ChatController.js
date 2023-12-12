const Chat = require('../Model/Chat')
const Profile = require('../Model/Profile')
module.exports.createChat = async(req, res) => {
    try{
        const newChat = await Chat.create({ 
            members: [req.body.senderEmail, req.body.receiverEmail]
        })
        if(!newChat){
            return res.status(400).json({message: "Error Creating Chat for the provided emails..."})
        }
        res.status(201).json({message: "Chat created successfully", chat: newChat})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.userChats = async (req, res) => {
    const userEmail = await req.params.userEmail;
    try {
        const userProfile = await Profile.find({ email: userEmail });
        if (!userProfile) {
            return res.status(400).json({ message: "User profile not found." });
        }
        const chatFound = await Chat.find({
            members: { $in: [userEmail] }
        });
        const filteredChats = chatFound.filter(chat => {
            const isBlockedByMember = chat.members.some(member => userProfile?.blockedUsers?.includes(member));
            return !isBlockedByMember;
        });
        if (filteredChats.length === 0) {
            return res.status(202).json({ message: "No chats found for the provided user." });
        }

        res.status(200).json({ chats: filteredChats });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.GetChat = async(req, res) => {
    try{
        const chatFound = await Chat.find({
            members: { $all: [req.query.firstEmail, req.query.secondEmail] }
        })
        if(!chatFound){
            return res.status(202).json({message: "no chats found for the provided users..."})
        }
        res.status(200).json({chats: chatFound})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
