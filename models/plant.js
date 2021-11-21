const mongoose = require('mongoose');
const PlantSchema = new mongoose.Schema({
    CommonName: {
        type: String,
        required: true
    },
    ScientificName: {
        type: String,
        required: true
    },
    Family: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Plant', PlantSchema);


