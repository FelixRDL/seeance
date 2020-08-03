var mongoose = require('mongoose')

const StudyEventSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true});
const StudyEventModel = mongoose.model("StudyEventModel", StudyEventSchema);

// Default export
export {StudyEventModel}
