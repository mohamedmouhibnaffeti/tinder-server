const Message = require('../Model/Message')

module.exports.addMessage = async (req, res) => {
    const { chatId, sender, text } = req.body
    try{
        const MessageCreated = await Message.create({ chatId, sender, text })
        if(!MessageCreated){
            return res.status(400).json({message: "Error Creating message..."})
        }
        return res.status(201).json({message: "Message created successfully", MessageCreated: MessageCreated})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.getMessages = async (req, res) => {
    const { chatId } = req.query
    try{
        const MessagesFound = await Message.find({ chatId: chatId })
        if(!MessagesFound){
            return res.status(204).json({message: "No messages found in this chat"})
        }
        return res.status(200).json({Messages: MessagesFound})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}