const plant = require('../models/plant');



// post add plant to database from admin.html form
module.exports.addPlant = (req, res) => {
    let newPlant = new plant({
        category: req.body.category,
        CommonName: req.body.CommonName,
        ScientificName: req.body.ScientificName,
        Description: req.body.Description
    });
    newPlant.save((err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.redirect('/admin');
        }
    });

    
}

//show all  plant in database
module.exports.showPlants = (req, res) => {
    plant.find({}, (err, plants) => {
        if (err) {
            console.log(err);
        } else {
            //console log database data
            console.log(plants);
        }
    });
}
