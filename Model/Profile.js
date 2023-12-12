const mongoose = require('mongoose')

function ImagesLimit(val){
    return (val.length <= 10) && (val.length >= 2)
}

const ProfileSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    showme: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    aboutme: {
        type: String,
        required: true
    },
    images:{
        type: [
            {
                type: String,
                required: true
            }
        ],
        validate: [ImagesLimit, "Images should be between 2 and 10"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    likedUsers: [
        {
            type: String,
            ref: 'User'
        }
    ],
    superLikedUsers: [
        {
            type: String,
            ref: 'User'
        }
    ],
    matches: [
        {
            type: String,
            ref: 'User'
        }
    ],
    Location : {
        Longtitude : {
            type: Number
        },
        Latitude: {
            type: Number
        }
    },
    phone: {
        type: String
    },
    blockedUsers: [
        {
            type: String,
            ref: 'User'
        }
    ],
})

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)

module.exports = Profile