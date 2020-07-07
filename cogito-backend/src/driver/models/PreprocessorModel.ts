var mongoose = require('mongoose')

const PreprocessorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    template: {
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
const PreprocessorModel = mongoose.model("PreprocessorModel", PreprocessorSchema);

// Default export
export {PreprocessorModel}