const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: String,
        ref: 'Profile'
    },
    text: {
        type: String
    }
  },
  {timestamps: true}
)

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

module.exports = Message