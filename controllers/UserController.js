const plant = require('../models/plant');



//plant profile

module.exports.PlantProfile = (req, res) => {
    let commonName = req.params.CommonName;
    plant.findOne({CommonName: commonName}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            res.render('plantprofile', {
                layout: './Layouts/SearchLayout',
                plant: plant
            });
        }
    });
};


// search plant by category
module.exports.searchPlantByCategory = (req, res) => {
    let category = req.params.category;
    plant.find({category: category}, (err, plant) => {
        if (err) {
            res.send(err);
        } else {
            console.log(plant);
            res.render('plantresults', {
                layout: './Layouts/SearchLayout',
                plant: plant,
            });
        }
    });
}


//search Plant by name
module.exports.searchPlantByName = (req, res) => {
    let searchCommon = req.body.searchCommon;
    let searchScientific = req.body.searchScientific;
    plant.find({$or: [{CommonName: searchCommon}, {ScientificName: searchScientific}]}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('plantresults', {
                plant: plant,
                layout: './Layouts/SearchLayout',
            });
        }
    });
   
}


//searc plant by alphabet
module.exports.searchPlantByLetter = (req, res) => {
    
    let letter = req.params.Letter;
    plant.find({CommonName: new RegExp('^' + letter.toLowerCase(), 'i')}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('plantresults', {
                layout: './Layouts/SearchLayout',
                plant: plant,
            });
        }
    });

}


//display all images of plants
module.exports.displayAllPlants = (req, res) => {
    plant.find({}, (err, plant) => {
        if (err) {
            res.send(err);
        } else {
            console.log(plant);
            res.render('Gallery', {
                layout: './Layouts/SearchLayout',
                plant: plant,
            });
        }
    });
}

// display images of plants where name in landscape object is equal to Type and  content is tree
module.exports.displayPlantsByType = (req, res) => {
    let type = req.params.Type;
    plant.find({"landscape.name": "Type", "landscape.content": type}, (err, plant) => {
        if (err) {
            res.send(err);
        } else {
            console.log(plant);
            res.render('Gallery', {
                layout: './Layouts/SearchLayout',
                plant: plant,
            });
        }
    });
}



