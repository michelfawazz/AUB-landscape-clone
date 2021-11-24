const {Router} = require('express');
const router = Router();
const AdminController = require('../controllers/UserController');
const plant = require('../models/plant');
const path = require('path');
let reqPath = path.join(__dirname, '../');


router.get('/', function(req, res) {
    // render index with another layout
    res.render('index', { layout: './Layouts/UserLayout' });

});

router.get('/about', function(req, res) {
    res.render('about', { layout: './Layouts/UserLayout' });

});

router.get('/Links', function(req, res) {
    res.render('links', { layout: './Layouts/UserLayout' });

});
router.get('/Category', function(req, res) {
    res.render('SearchCategory', { layout: './Layouts/SearchLayout' });

});

router.get('/SearchName', function(req, res) {
    res.render('SearchName', { layout: './Layouts/SearchLayout' });
});

router.post("/SearchByName", AdminController.searchPlantByName);

router.get("/Gallery", AdminController.displayAllPlants);

router.get("/SearchCategory/:category",AdminController.searchPlantByCategory);

router.get('/SearchLetter/:Letter',AdminController.searchPlantByLetter);

router.get("/Gallery/:type", AdminController.displayPlantsByType);

module.exports = router;