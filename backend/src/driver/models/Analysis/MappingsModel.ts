var mongoose = require('mongoose')

const MappingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true});
const MappingsModel = mongoose.model("MappingsModel", MappingsSchema);

// Default export
export {MappingsModel}
