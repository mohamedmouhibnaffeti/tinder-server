const mongoose = require('mongoose')

const MembersLength = (members) => {
  return members.length === 2
}

const ChatSchema = mongoose.Schema({
    members: {
      type: [
        {
          type: String,
          ref: 'Profile'
        },
      ],
      validate: [MembersLength, "Verify users inserted in this chat..."]
    }
  },
  {timestamps: true}
)

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema)

module.exports = Chat