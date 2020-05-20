var mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique : true
    }
}, {timestamps: true});
const UserModel = mongoose.model("UserModel", UserSchema);

// Default export
export {UserModel}