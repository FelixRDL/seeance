var mongoose = require('mongoose')

const AnalysisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    analysis: {
        type: String,
        required: false
    },
    assignedProject: {
        type: String,
        required: true
    },
    assignedCourse: {
        type: String,
        required: true
    },
    config: {
        "type": Object
    }
}, {timestamps: true});
const AnalysisModel = mongoose.model("AnalysisModel", AnalysisSchema);

// Default export
export {AnalysisModel}