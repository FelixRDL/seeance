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
    },
    analysisIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnalysisModel'
    }]
}, {timestamps: true});
const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);

// Default export
export {ProjectModel}