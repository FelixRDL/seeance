import {User} from "../../logic/entities/User";

var mongoose = require('mongoose')


const CourseSchema = new mongoose.Schema({
    title: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'};
    createdDate: Date
}, {timestamps: true});
const CourseModel = mongoose.model("UserModel", CourseSchema);

// Default export
export {CourseModel}