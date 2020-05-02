var mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
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