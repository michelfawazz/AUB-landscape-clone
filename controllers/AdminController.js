const plant = require('../models/plant');


// post add plant to database from admin.html form
module.exports.addPlant = (req, res) => {
    let newPlant = new plant({
        category: req.body.category,
        CommonName: req.body.CommonName.toLowerCase(),
        ScientificName: req.body.ScientificName.toLowerCase(),
        Description: req.body.Description,
        // get all file names from the form
        image: req.files.map(file => file.filename),
        landscape: [{name: req.body.land1, content: req.body.landc1},{name: req.body.land2, content: req.body.landc2},{name: req.body.land3, content: req.body.landc3}],
        botanical:[{name: req.body.bot1, content: req.body.botc1},{name: req.body.bot2, content: req.body.botc2}],
        horticulture: [{name: req.body.hort1, content: req.body.hortc1},{name: req.body.hort2, content: req.body.hortc2}],
        
    });
    

    newPlant.save((err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            
            res.redirect('/admin/addplant');
            
        }
    });

    
};

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



// search for plant by common name or scientific name using input from admin.html form

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

//modify plant in database
module.exports.modifyPlant = (req, res) => {
    let commonName = req.params.CommonName;
    plant.find({CommonName: commonName}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('modifyplant', {
                plant: plant,
            });
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








