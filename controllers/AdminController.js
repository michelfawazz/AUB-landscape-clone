const plant = require('../models/plant');
const nodemailer = require('nodemailer');
const ContactModel = require('../models/ContactModel');



// post add plant to database from admin.html form
module.exports.addPlant = async (req, res) => {



    let newPlant = new plant({
        category: req.body.category,
        CommonName: req.body.CommonName.toLowerCase(),
        ScientificName: req.body.ScientificName.toLowerCase(),
        origin: req.body.origin,
        Description: req.body.Description,
        // get all file names from the form
        image: req.files.map(file => file.filename),
        landscape: [{name: "French name", content: req.body.landc1, group: "general"},{name: "Pronounciation", content: req.body.landc2, group: "general"},
        {name: "Type", content: req.body.landc3, group: "general"},
        {name: "Uses", content: req.body.landc4, group: "general"},
        {name: "Growth Rate", content: req.body.landc5, group: "Size/Shape"},
        {name: "Tree Shape", content: req.body.landc6, group: "Size/Shape"},
        {name: "Cannopy Symmetry", content: req.body.landc7, group: "Size/Shape"},
        {name: "Plant Density", content: req.body.landc8, group: "Size/Shape"},
        {name: "Plant Height", content: req.body.landc9, group: "Size/Shape"},
        {name: "Plant Spread", content: req.body.landc10, group: "Size/Shape"},
        {name: "Time to Ultimate Height", content: req.body.landc11, group: "Size/Shape"}],
        botanical:[{name: "Leaf Arrangement", content: req.body.botc1, group: "Foliage"},
            {name: "Persistence", content: req.body.botc2, group: "Foliage"},
            {name: "Color Growing Season", content: req.body.botc3, group: "Foliage"},
            {name: "Color Changing season", content: req.body.botc4, group: "Foliage"},
            {name: "Flower Color", content: req.body.botc5, group: "Flower"},
            {name: "Flowering Scent", content: req.body.botc6, group: "Flower"},
            {name: "Flowering Season", content: req.body.botc7, group: "Flower"},
            {name: "Flower Showiness", content: req.body.botc8, group: "Flower"},
            {name: "Esthetic value", content: req.body.botc9, group: "Trunk"},
            {name: "Number of Trunks", content: req.body.botc10, group: "Trunk"},
            {name: "Fruit Showiness", content: req.body.botc11, group: "Fruit"},
            {name: "Fruit Color", content: req.body.botc12, group: "Fruit"},
            {name: "Fruit Size", content: req.body.botc13, group: "Fruit"},
            {name: "Fruit Season", content: req.body.botc14, group: "Fruit"},
            {name: "Fruit Type", content: req.body.botc15, group: "Fruit"},


        ],
        horticulture: [{name: "Frost Tolerant", content: req.body.hortc1, group: "Tolerance"},
            {name: "Heat Tolerant", content: req.body.hortc2, group: "Tolerance"},
            {name: "Light", content: req.body.hortc3, group: "Requirements"},
            {name: "Water", content: req.body.hortc4, group: "Requirements"},
            {name: "Toxic", content: req.body.hortc5, group: "Management"},
            {name: "Invasive", content: req.body.hortc6, group: "Management"},
            {name: "Suceptibility to diseases", content: req.body.hortc7, group: "Management"},
            {name: "Litter", content: req.body.hortc8, group: "Management"},
            {name: "Surface rooting", content: req.body.hortc9, group: "Management"},
            {name: "Life Span", content: req.body.hortc10, group: "Management"},
        ],
        
    });

    newPlant.save((err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            
            res.redirect('/admin/addplant');
            
        }
    });
}




module.exports.updatePlant = (req, res) => {

    let old_images = [];
    plant.findById(req.params.id, (err, foundPlant)=>{
        if(foundPlant && foundPlant.image && foundPlant.image.length ) {
            old_images = foundPlant.image;

        }    
        if(req.files)
            req.files.map(item=>{
                old_images.push(item.filename);
            });
        
    let newPlant = new plant({
        _id: req.params.id,
        category: req.body.category,
        CommonName: req.body.CommonName.toLowerCase(),
        ScientificName: req.body.ScientificName.toLowerCase(),
        origin: req.body.origin,
        Description: req.body.Description,
        // get all file names from the form
        image: old_images,
        landscape: [
            {name: "French name", content: req.body.landc1, group: "general"},
            {name: "Pronounciation", content: req.body.landc2, group: "general"},
            {name: "Type", content: req.body.landc3, group: "general"},
            {name: "Uses", content: req.body.landc4, group: "general"},
            {name: "Growth Rate", content: req.body.landc5, group: "Size/Shape"},
            {name: "Tree Shape", content: req.body.landc6, group: "Size/Shape"},
            {name: "Cannopy Symmetry", content: req.body.landc7, group: "Size/Shape"},
            {name: "Plant Density", content: req.body.landc8, group: "Size/Shape"},
            {name: "Plant Height", content: req.body.landc9, group: "Size/Shape"},
            {name: "Plant Spread", content: req.body.landc10, group: "Size/Shape"},
            {name: "Time to Ultimate Height", content: req.body.landc11, group: "Size/Shape"}
        ],
        botanical:[
            {name: "Leaf Arrangement", content: req.body.botc1, group: "Foliage"},
            {name: "Persistence", content: req.body.botc2, group: "Foliage"},
            {name: "Color Growing Season", content: req.body.botc3, group: "Foliage"},
            {name: "Color Changing season", content: req.body.botc4, group: "Foliage"},
            {name: "Flower Color", content: req.body.botc5, group: "Flower"},
            {name: "Flowering Scent", content: req.body.botc6, group: "Flower"},
            {name: "Flowering Season", content: req.body.botc7, group: "Flower"},
            {name: "Flower Showiness", content: req.body.botc8, group: "Flower"},
            {name: "Esthetic value", content: req.body.botc9, group: "Trunk"},
            {name: "Number of Trunks", content: req.body.botc10, group: "Trunk"},
            {name: "Fruit Showiness", content: req.body.botc11, group: "Fruit"},
            {name: "Fruit Color", content: req.body.botc12, group: "Fruit"},
            {name: "Fruit Size", content: req.body.botc13, group: "Fruit"},
            {name: "Fruit Season", content: req.body.botc14, group: "Fruit"},
            {name: "Fruit Type", content: req.body.botc15, group: "Fruit"},
        ],
        horticulture: [
            {name: "Frost Tolerant", content: req.body.hortc1, group: "Tolerance"},
            {name: "Heat Tolerant", content: req.body.hortc2, group: "Tolerance"},
            {name: "Light", content: req.body.hortc3, group: "Requirements"},
            {name: "Water", content: req.body.hortc4, group: "Requirements"},
            {name: "Toxic", content: req.body.hortc5, group: "Management"},
            {name: "Invasive", content: req.body.hortc6, group: "Management"},
            {name: "Suceptibility to diseases", content: req.body.hortc7, group: "Management"},
            {name: "Litter", content: req.body.hortc8, group: "Management"},
            {name: "Surface rooting", content: req.body.hortc9, group: "Management"},
            {name: "Life Span", content: req.body.hortc10, group: "Management"},
        ],        
    });
        plant.findByIdAndUpdate(req.params.id, newPlant, {multi: false} , (err, updatedPlant)=>{
            if (err) {
                console.log(err);
            } else {
                res.redirect('/admin');
            }
        });
    });

}

    


//redirect to adminplant page passing plant object
module.exports.PlantProfile = (req, res) => {
    let commonName = req.params.CommonName;
    plant.findOne({CommonName: commonName}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            res.render('adminplant', {
                plant: plant
            });
        }
    });
};





            

module.exports.searchPlantByName = (req, res) => {
    let searchCommon = req.body.searchCommon;
    let searchScientific = req.body.searchScientific;
    plant.find({$or: [{CommonName: searchCommon}, {ScientificName: searchScientific}]}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('adminplant', {
                plant: plant,
            });
        }
    });
   
}

// filter all plants whose common name starts with the ltter in the url
module.exports.searchPlantByLetter = (req, res) => {
    
    let letter = req.params.Letter;
    plant.find({CommonName: new RegExp('^' + letter.toLowerCase(), 'i')}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('AdminSearchRes', {
                plant: plant,
            });
        }
    });

}

//display all contactModel
module.exports.Contact = (req, res) => {
    ContactModel.find({}, (err, contact) => {
        if (err) {
            console.log(err);
        } else {
            console.log(contact);
            res.render('admincontact', {
                contact: contact,
            });
        }
    });
}

//reply to the contact email by email using the message in the text
module.exports.reply = (req, res) => {
    let email = req.params.email;
    let reply = req.body.reply;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cmps253proj03@gmail.com',
            pass: 'proj03cmps'
        }
    });
    let mailOptions = {
        from: 'cmps253proj03@gmail.com',
        to: email,
        subject: "REPLY",
        text: reply
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
            res.redirect('/admin/admincontact');
        }
    });
}



// delete record from contactModel
module.exports.deleteContact = (req, res) => {
    let id = req.params.id;
    ContactModel.findByIdAndDelete(id, (err, contact) => {
        if (err) {
            console.log(err);
        } else {
            console.log(contact);
            res.redirect('/admin/admincontact');
        }
    });
}










//delete plant from database
module.exports.deletePlant = (req, res) => {
    let id = req.params.id;
    plant.findByIdAndDelete(id, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            
            
            res.redirect('/admin');
           
        }
    });


}








