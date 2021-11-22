const {Router} = require('express');
const router = Router();
const AdminController = require('../controllers/AdminController');
const plant = require('../models/plant');
const path = require('path');
let reqPath = path.join(__dirname, '../');

router.get('/', (req, res) => {
    //show admin.html
    res.sendFile(reqPath + '/html_files/admin.html');

});

router.post('/add', AdminController.addPlant);

router.get("/ShowAll",AdminController.showPlants);


module.exports = router;