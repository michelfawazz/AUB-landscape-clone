const plant = require('../models/plant');


// post add plant to database from admin.html form
module.exports.addPlant = (req, res) => {
    let newPlant = new plant({
        CommonName: req.body.CommonName,
        ScientificName: req.body.ScientificName,
        Description: req.body.Description,
        images: req.body.images,
        landscape: {name: req.body.land1, content: req.body.Landc1},
        botanical: {name: req.body.bot1, content: req.body.botc1},
        horticulture: {name: req.body.hort1, content: req.body.hortc1},
        
        
        
        
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








