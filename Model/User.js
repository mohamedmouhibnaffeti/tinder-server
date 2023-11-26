const mongoose= require('mongoose')
const { models } = require("mongoose")
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Enter a valid email address..."]
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function(next){
    const user = this
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
})

const User = models.User || mongoose.model('User', UserSchema)


module.exports = User