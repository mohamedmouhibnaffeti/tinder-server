const Chat = require('../Model/Chat')

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

module.exports.userChats = async(req, res) => {
    const userEmail = await req.params.userEmail
    try{
        const chatFound = await Chat.find({
            members: {$in: [userEmail]}
        })
        if(!chatFound){
            return res.status(202).json({message: "no chats found for the provided user..."})
        }
        res.status(200).json({chats: chatFound})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

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
