import {User} from "../../logic/entities/User";

var mongoose = require('mongoose')


const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    authorizeeIds: [{
        "type": String
    }]
}, {timestamps: true});
const CourseModel = mongoose.model("CourseModel", CourseSchema);

// Default export
export {CourseModel}