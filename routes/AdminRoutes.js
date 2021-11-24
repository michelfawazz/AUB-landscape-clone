const {Router} = require('express');
const router = Router();
const AdminController = require('../controllers/AdminController');
const plant = require('../models/plant');
const path = require('path');
let reqPath = path.join(__dirname, '../');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
    
});

const upload = multer({
    storage: storage,
}).array('image');




router.get('/', (req, res) => {
    res.render('admin')
});

router.get("/adminplant", (req, res) => {
    res.render('adminplant');
});


router.get('/addplant', (req, res) => {
    res.render("AddPlant")

});



router.get("/PlantAdminProfile/:CommonName" , AdminController.PlantProfile);

router.get("/ModifyPlant/:CommonName" , AdminController.modifyPlant);

router.post('/add', upload,AdminController.addPlant);

router.get('/deletePlant/:id', AdminController.deletePlant);

//search for plant
router.post("/searchByName",AdminController.searchPlantByName);

router.get("/searchByLetter/:Letter",AdminController.searchPlantByLetter);

module.exports = router;