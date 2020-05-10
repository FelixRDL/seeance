var mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    
}, {timestamps: true});
const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);

// Default export
export {ProjectModel}