const plant = require('../models/plant');
const ContactModel = require('../models/ContactModel');
const fs = require('fs');




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

// save the data from the contact for to display later
module.exports.saveContact = (req, res) => {
    let  contactModel = new ContactModel ({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
    contactModel.save((err, contactModel) => {
        if (err) {
            console.log(err);
        } else {
            console.log(contactModel);
            res.redirect('/');
        }
    }
    );
}


module.exports.searchPlantIdentity = (req, res) => {

    
    let type = req.body.landc3;
    

    let shape = req.body.landc6;
    let Pheight = req.body.landc9;
    let Pspread = req.body.landc10;

    let LeafArrang = req.body.botc1;
    let LeafPers = req.body.botc2;
    let ColorGrowing = req.body.botc3;
    let ColorChanging = req.body.botc4;


    let FlowerColor = req.body.botc5;
    let FlowerScent = req.body.botc6;
    let FlowerSeason = req.body.botc7;
    let FlowerShowiness = req.body.botc8;

    let trunkEsthetic = req.body.botc9;
    let trunkNumber = req.body.botc10;

    let FruitShowiness = req.body.botc11;
    let FruitColor = req.body.botc12;
    let FruitSize = req.body.botc13;
    let FruitSeason = req.body.botc14;
    let FruitType = req.body.botc15;

    console.log(type);
    //find in plant database plants where the variables that are not null match them in the database
    plant.find({
        $and: [
            {
                $or: [
                        {'landscape.name': 'Type', 'landscape.content': type, group: 'general'},
    {'landscape.name': 'Tree Shape', 'landscape.content': shape, group: 'Size/Shape'}, 
    {'landscape.name': 'Plant Height', 'landscape.content': Pheight, group: 'Size/Shape'},
     {'landscape.name': 'Plant Spread', 'landscape.content': Pspread , group: 'Size/Shape'},
     {'botanical.name': 'Leaf Arrangement', 'botanical.content': LeafArrang, group:"Foliage"},
      {'botanical.name': 'Persistence', 'botanical.content': LeafPers , group: "Foliage"},
       {'botanical.name': 'Color Growing Season', 'botanical.content': ColorGrowing , group: "Foliage"},
        {'botanical.name': 'Color Changing season', 'botanical.content': ColorChanging , group: "Foliage"},
        {'botanical.name': 'Flower Color', 'botanical.content': FlowerColor , group: "Flower"},
        {'botanical.name': 'Flower Scent', 'botanical.content': FlowerScent , group: "Flower"},
        {'botanical.name': 'Flower Season', 'botanical.content': FlowerSeason , group: "Flower"}, 
        {'botanical.name': 'Flower Showiness', 'botanical.content': FlowerShowiness , group: "Flower"}, 
        {'botanical.name': 'Esthetic value', 'botanical.content': trunkEsthetic , group: "Trunk"}, 
        {'botanical.name': 'Number of Trunks', 'botanical.content': trunkNumber , group: "Trunk"},
         {'botanical.name': 'Fruit Showiness', 'botanical.content': FruitShowiness , group: "Fruit"},
          {'botanical.name': 'Fruit Color', 'botanical.content': FruitColor , group: "Fruit"},
           {'botanical.name': 'Fruit Size', 'botanical.content': FruitSize , group: "Fruit"},
            {'botanical.name': 'Fruit Season', 'botanical.content': FruitSeason , group: "Fruit"},
             {'botanical.name': 'Fruit Type', 'botanical.content': FruitType, group:"Fruit"} , 
            ]}]}, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            res.render('plantresults', {
                layout: './Layouts/SearchLayout',
                plant: plant,
            });
        }

    }
    );
    
}
                

module.exports.pdfdownload = (req, res) => {
    let id = req.params.id;
    plant.findById(id, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);

         // fill data in the downloadpdf page with plant and prompt user to download
            res.render('pdfdownload', {
                layout: './Layouts/pdfLayout',
                
              
                plant: plant,
            });

        

        }
    });

}


   