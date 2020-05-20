var mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true
    },
    id: Number,
    login: String,
    description: String,
    profileLink: String,
    avatarImageUrl: String,
    registeredSince: Date
}, {timestamps: true});
const UserModel = mongoose.model("UserModel", UserSchema);

// Default export
export {UserModel}