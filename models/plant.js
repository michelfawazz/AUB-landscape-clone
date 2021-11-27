const mongoose = require('mongoose');

const Property = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
    },
    content : {
        type : [String],
        // required : true,
    },
    group : {
        type: String,
        // required : true,
    },
})

const PlantSchema = new mongoose.Schema({

    category : {
        type : String,
        required : true,
    },
    CommonName: {
        type: String,
        required: true
    },
    ScientificName: {
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    image: {
        type: [String],
        required: true
    },

    landscape: {
        type: [Property]
    },

    botanical: {
        type: [Property]
    },

    horticulture: {
        type: [Property]
    }


});

module.exports = mongoose.model('Plant', PlantSchema);
