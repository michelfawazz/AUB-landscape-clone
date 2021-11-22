const plant = require('../models/plant');



// post add plant to database from admin.html form
module.exports.addPlant = (req, res) => {
    let newPlant = new plant({
        CommonName: req.body.CommonName,
        ScientificName: req.body.ScientificName,
        Description: req.body.Description,
        images: req.body.images,
        
        
        
    });
    

    newPlant.save((err, plant) => {
        if (err) {
            console.log(err);
        } else {
            console.log(plant);
            
        }
    });

    
}





