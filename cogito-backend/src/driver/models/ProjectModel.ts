var mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    repositoryId: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseModel',
        required: true
    }
}, {timestamps: true});
const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);

// Default export
export {ProjectModel}