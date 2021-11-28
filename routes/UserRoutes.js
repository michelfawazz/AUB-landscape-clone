const {Router} = require('express');
const router = Router();
const UserController = require('../controllers/UserController');
const plant = require('../models/plant');
const Contact = require('../models/ContactModel');
const path = require('path');
let reqPath = path.join(__dirname, '../');


router.get('/', function(req, res) {
    plant.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        plant.findOne().skip(random).exec(
          function (err, result) {
            if (err) {
              console.log(err)
            } else {
              // If no errors, render the page
              console.log(result);
              res.render('index', {
               
                layout: './Layouts/UserLayout',
                plant: result
              });
            }
            
          })
      })
});
   


router.get('/about', function(req, res) {
    res.render('about', { layout: './Layouts/UserLayout' });

});

router.get('/Links', function(req, res) {
    res.render('links', { layout: './Layouts/UserLayout' });

});
router.get('/Category', function(req, res) {
    res.render('SearchCategory', { layout: './Layouts/UserLayout' });

});

router.get('/Glossary', function(req, res) {
    res.render('Glossary', { layout: './Layouts/UserLayout' });
});

router.get('/SearchName', function(req, res) {
    res.render('SearchName', { layout: './Layouts/UserLayout' });
});

router.get('/Contact', function(req, res) {
    res.render('Contact', { layout: './Layouts/UserLayout' });
});

router.get('/PlantIdentity', function(req, res) {
    res.render('PlantIdentity', { layout: './Layouts/UserLayout' });
});

router.post('/Contacted', UserController.saveContact);

router.post("/SearchByName", UserController.searchPlantByName);

router.get("/Gallery", UserController.displayAllPlants);

router.get("/SearchCategory/:category",UserController.searchPlantByCategory);

router.post("/SearchPlantIdentity",UserController.searchPlantIdentity);


router.get('/SearchLetter/:Letter',UserController.searchPlantByLetter);

router.get("/Gallery/:Type", UserController.displayPlantsByType);

router.get("/PlantProfile/:CommonName" , UserController.PlantProfile);

router.get("/pdfdownload/:id" , UserController.pdfdownload);

module.exports = router;