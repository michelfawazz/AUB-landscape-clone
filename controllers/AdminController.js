const plant = require('../models/plant');


// post add plant to database from admin.html form
module.exports.addPlant = (req, res) => {
    let newPlant = new plant({
        category: req.body.category,
        CommonName: req.body.CommonName,
        ScientificName: req.body.ScientificName,
        Description: req.body.Description,
        // get all file names from the form
        image: req.files.map(file => file.filename),
        landscape: [{name: req.body.land1, content: req.body.landc1},{name: req.body.land2, content: req.body.landc2}],
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

    
}


// search for plant by common name or scientific name using input from admin.html form

module.exports.searchPlant = (req, res) => {
    let search = req.body.search;
    plant.find({$or: [{CommonName: search}, {ScientificName: search}]}, (err, plant) => {
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








