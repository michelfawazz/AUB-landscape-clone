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

router.post('/add', upload,AdminController.addPlant);

//search for plant
router.post("/search",AdminController.searchPlant);

module.exports = router;