const mongoose = require('mongoose');

const Property = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
    },
    content : {
        type : String,
        // required : true,
    },
    group : {
        type: String,
        // required : true,
    },
})

const PlantSchema = new mongoose.Schema({
   
    CommonName: {
        type: String,
        required: true
    },
    ScientificName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },

    images: {
        type: [String]
    },

    landscape: {
        type: [Property]
    }


});

module.exports = mongoose.model('Plant', PlantSchema);
