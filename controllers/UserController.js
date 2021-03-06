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
                layout: './Layouts/UserLayout',
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
                layout: './Layouts/UserLayout',
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
                layout: './Layouts/UserLayout',
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
                layout: './Layouts/UserLayout',
                plant: plant,
            });
        }
    });

}


//display all images of plants
module.exports.displayAllPlants = (req, res) => {

  
    var perPage = parseInt(req.body.perpage) ||9;

    var page = req.params.page || 1
    var type = "";

    var Sort = req.body.sort || "ScientificName";
    


    plant.find({}).sort(Sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, plants) {
        plant.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('Gallery', {
                layout: './Layouts/UserLayout',
                plant: plants,
                current: page,
                pages: Math.ceil(count / perPage),
                type: type,
                perPage: perPage,
                Sorts: Sort,
               
            })
        })
       
    })
}

 
// display images of plants where name in landscape object is equal to Type and  content is tree
module.exports.displayPlantsByType = (req, res) => {
    var perPage = parseInt(req.body.perpage) ||9;
    console.log(perPage);

    var Sort = req.body.sort || "ScientificName";
    
    var page = req.params.page || 1
    let type = req.params.Type;
    plant.find({"landscape.name": "Type", "landscape.content": type}).sort(Sort).skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, plants) {
        plant.find({"landscape.name": "Type", "landscape.content": type}).count().exec(function(err, count) {
            if (err) return next(err)
            console.log(type);
            res.render('Gallery', {
                layout: './Layouts/UserLayout',
                plant: plants,
                current: page,
                pages: Math.ceil(count / perPage),
                type: type,
                perPage: perPage,
                Sorts: Sort,
             
            });
        })
    })
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
    let query = [];
    if(req.body.landc3)
        query.push({'landscape.name': 'Type', 'landscape.content': req.body.landc3, 'landscape.group': 'general'});
    if(req.body.landc6)
        query.push({'landscape.name': 'Tree Shape', 'landscape.content': req.body.landc6, 'landscape.group': 'Size/Shape'});
    if(req.body.landc9)
        query.push({'landscape.name': 'Plant Height', 'landscape.content': req.body.landc9, 'landscape.group': 'Size/Shape'});
    if(req.body.landc10)
        query.push({'landscape.name': 'Plant Spread', 'landscape.content': req.body.landc10 , 'landscape.group': 'Size/Shape'});
    
    if(req.body.botc1)
        query.push({'botanical.name': 'Leaf Arrangement', 'botanical.content': req.body.botc1, 'botanical.group':'Foliage'});
    if(req.body.botc2)
        query.push({'botanical.name': 'Persistence', 'botanical.content': req.body.botc2 , 'botanical.group': 'Foliage'});
    if(req.body.botc3)
        query.push({'botanical.name': 'Color Growing Season', 'botanical.content': req.body.botc3 , 'botanical.group': 'Foliage'});
    if(req.body.botc4)
        query.push({'botanical.name': 'Color Changing season', 'botanical.content': req.body.botc4 , 'botanical.group': 'Foliage'});

    if(req.body.botc5)
        query.push({'botanical.name': 'Flower Color', 'botanical.content': req.body.botc5 , 'botanical.group': 'Flower'});
    if(req.body.botc6)
        query.push({'botanical.name': 'Flower Scent', 'botanical.content': req.body.botc6 , 'botanical.group': 'Flower'});
    if(req.body.botc7)
        query.push({'botanical.name': 'Flower Season', 'botanical.content': req.body.botc7 , 'botanical.group': 'Flower'});
    if(req.body.botc8)
        query.push({'botanical.name': 'Flower Showiness', 'botanical.content': req.body.botc8 , 'botanical.group': 'Flower'});

    if(req.body.botc9)
        query.push({'botanical.name': 'Esthetic value', 'botanical.content': req.body.botc9 , 'botanical.group': 'Trunk'});
    if(req.body.botc10)
        query.push({'botanical.name': 'Number of Trunks', 'botanical.content': req.body.botc10 , 'botanical.group': 'Trunk'});

    if(req.body.botc11)
        query.push({'botanical.name': 'Fruit Showiness', 'botanical.content': req.body.botc11 , 'botanical.group': 'Fruit'});
    if(req.body.botc12)
        query.push({'botanical.name': 'Fruit Color', 'botanical.content': req.body.botc12 , 'botanical.group': 'Fruit'});
    if(req.body.botc13)
        query.push({'botanical.name': 'Fruit Size', 'botanical.content': req.body.botc13 , 'botanical.group': 'Fruit'});
    if(req.body.botc14)
        query.push({'botanical.name': 'Fruit Season', 'botanical.content': req.body.botc14 , 'botanical.group': 'Fruit'})
    if(req.body.botc15)
        query.push({'botanical.name': 'Fruit Type', 'botanical.content': req.body.botc15, 'botanical.group':'Fruit'})

    //find in plant database plants where the variables that are not null match them in the database
    plant.find({ $and: query }, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            res.render('plantresults', { layout: './Layouts/UserLayout',
                plant: plant });
        }
    }
    );
    
}


module.exports.searchPlantCriteria = (req, res) => {    
    let query2 = [];


    if(req.body.landc3)
        query2.push({'landscape.name': 'Type', 'landscape.content': req.body.landc3, 'landscape.group': 'general'});

    if(req.body.landc4)
        query2.push({'landscape.name': 'Uses', 'landscape.content': req.body.landc4, 'landscape.group': 'general'});
    
    if(req.body.landc5)
        query2.push({'landscape.name': 'Growth Rate', 'landscape.content': req.body.landc5, 'landscape.group': 'Size/Shape'});
   
    if(req.body.landc6)
        query2.push({'landscape.name': 'Tree Shape', 'landscape.content': req.body.landc6, 'landscape.group': 'Size/Shape'});
    if(req.body.landc9)
        query2.push({'landscape.name': 'Plant Height', 'landscape.content': req.body.landc9, 'landscape.group': 'Size/Shape'});
    if(req.body.landc10)
        query2.push({'landscape.name': 'Plant Spread', 'landscape.content': req.body.landc10 , 'landscape.group': 'Size/Shape'});
    
    if(req.body.botc1)
        query2.push({'botanical.name': 'Leaf Arrangement', 'botanical.content': req.body.botc1, 'botanical.group':'Foliage'});
    if(req.body.botc2)
        query2.push({'botanical.name': 'Persistence', 'botanical.content': req.body.botc2 , 'botanical.group': 'Foliage'});
    if(req.body.botc3)
        query2.push({'botanical.name': 'Color Growing Season', 'botanical.content': req.body.botc3 , 'botanical.group': 'Foliage'});
    if(req.body.botc4)
        query2.push({'botanical.name': 'Color Changing season', 'botanical.content': req.body.botc4 , 'botanical.group': 'Foliage'});

    if(req.body.botc5)
        query2.push({'botanical.name': 'Flower Color', 'botanical.content': req.body.botc5 , 'botanical.group': 'Flower'});
    if(req.body.botc6)
        query2.push({'botanical.name': 'Flower Scent', 'botanical.content': req.body.botc6 , 'botanical.group': 'Flower'});
    if(req.body.botc7)
        query2.push({'botanical.name': 'Flower Season', 'botanical.content': req.body.botc7 , 'botanical.group': 'Flower'});
    if(req.body.botc8)
        query2.push({'botanical.name': 'Flower Showiness', 'botanical.content': req.body.botc8 , 'botanical.group': 'Flower'});

    if(req.body.botc9)
        query2.push({'botanical.name': 'Esthetic value', 'botanical.content': req.body.botc9 , 'botanical.group': 'Trunk'});
    if(req.body.botc10)
        query2.push({'botanical.name': 'Number of Trunks', 'botanical.content': req.body.botc10 , 'botanical.group': 'Trunk'});

    if(req.body.botc11)
        query2.push({'botanical.name': 'Fruit Showiness', 'botanical.content': req.body.botc11 , 'botanical.group': 'Fruit'});
    if(req.body.botc12)
        query2.push({'botanical.name': 'Fruit Color', 'botanical.content': req.body.botc12 , 'botanical.group': 'Fruit'});
    if(req.body.botc13)
        query2.push({'botanical.name': 'Fruit Size', 'botanical.content': req.body.botc13 , 'botanical.group': 'Fruit'});
    if(req.body.botc14)
        query2.push({'botanical.name': 'Fruit Season', 'botanical.content': req.body.botc14 , 'botanical.group': 'Fruit'})
    if(req.body.botc15)
        query2.push({'botanical.name': 'Fruit Type', 'botanical.content': req.body.botc15, 'botanical.group':'Fruit'})

    if(req.body.hortc1)
        query2.push({'horticulture.name': "Frost Tolerant", 'horticulture.content': req.body.hortc1, group: "Tolerance"});
    
    if(req.body.hortc2)
        query2.push({'horticulture.name': "Heat Tolerant", 'horticulture.content': req.body.hortc2, group: "Tolerance"});

    if(req.body.hortc3)
        query2.push({'horticulture.name': "Light", 'horticulture.content': req.body.hortc3, group: "Requirements"});
    
    if(req.body.hortc4)
        query2.push({'horticulture.name': "Water", 'horticulture.content': req.body.hortc4, group: "Requirements"});



    if(req.body.hortc6)
        query2.push({'horticulture.name': "Invasive", 'horticulture.content': req.body.hortc6, group: "Management"});

    if(req.body.hortc7)
        query2.push({'horticulture.name': "Suceptibility to diseases", 'horticulture.content': req.body.hortc7, group: "Management"});


    if(req.body.hortc8)
        query2.push({'horticulture.name': "Litter", 'horticulture.content': req.body.hortc8, group: "Management"});

    if(req.body.hortc9)
        query2.push({'horticulture.name': "Surface rooting", 'horticulture.content': req.body.hortc9, group: "Management"});

    if(req.body.hortc10)
        query2.push({'horticulture.name': "Life Span", 'horticulture.content': req.body.hortc10, group: "Management"});
    //find in plant database plants where the variables that are not null match them in the database
    plant.find({ $and: query2 }, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            res.render('plantresults', { 
                layout: './Layouts/UserLayout',
                plant: plant });
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

