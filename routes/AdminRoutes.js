const {Router} = require('express');
const router = Router();
const AdminController = require('../controllers/AdminController');
const PlantSchema = require('../models/plant');
const ContactModel = require('../models/ContactModel');
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


router.get('/addplant', async (req, res) => {
    res.render("AddPlant")

});




// get:id: get a particular post
router.get('/update/:id', async (req, res)=>{
    const plant = await PlantSchema.findById(req.params.id).exec();
    if(plant){
        let newData = {};
        newData._id = plant._id;
        newData.category = plant.category;
        newData.CommonName = plant.CommonName;
        newData.ScientificName = plant.ScientificName;
        newData.origin = plant.origin;
        newData.Description = plant.Description;
        newData.image = plant.image;

        plant.landscape.map(item=>{
            switch(item.name) {
                case "French name": newData.landc1 = item.content; break;
                case "Pronounciation": newData.landc2 = item.content; break;
                case "Type": newData.landc3 = item.content; break;
                case "Uses": newData.landc4 = item.content; break;
                case "Growth Rate": newData.landc5 = item.content; break;
                case "Tree Shape": newData.landc6 = item.content; break;
                case "Cannopy Symmetry": newData.landc7 = item.content; break;
                case "Plant Density": newData.landc8 = item.content; break;
                case "Plant Height": newData.landc9 = item.content; break;
                case "Plant Spread": newData.landc10 = item.content; break;
                case "Time to Ultimate Height": newData.landc11 = item.content; break;
                default: break;
            }
        });

        plant.botanical.map(item=>{
            switch(item.name) {
                case "Leaf Arrangement": newData.botc1 = item.content; break;
                case "Persistence": newData.botc2 = item.content; break;
                case "Color Growing Season": newData.botc3 = item.content; break;
                case "Color Changing season": newData.botc4 = item.content; break;
                case "Flower Color": newData.botc5 = item.content; break;
                case "Flowering Scent": newData.botc6 = item.content; break;
                case "Flowering Season": newData.botc7 = item.content; break;
                case "Flower Showiness": newData.botc8 = item.content; break;
                case "Esthetic value": newData.botc9 = item.content; break;
                case "Number of Trunks": newData.botc10 = item.content; break;
                case "Fruit Showiness": newData.botc11 = item.content; break;
                case "Fruit Color": newData.botc12 = item.content; break;
                case "Fruit Size": newData.botc13 = item.content; break;
                case "Fruit Season": newData.botc14 = item.content; break;
                case "Fruit Type": newData.botc15 = item.content; break;
                default: break;
            }
        });

        plant.horticulture.map(item=>{
            switch(item.name) {
                case "Frost Tolerant": newData.hortc1 = item.content; break;
                case "Heat Tolerant": newData.hortc2 = item.content; break;
                case "Light": newData.hortc3 = item.content; break;
                case "Water": newData.hortc4 = item.content; break;
                case "Toxic": newData.hortc5 = item.content; break;
                case "Invasive": newData.hortc6 = item.content; break;
                case "Suceptibility to diseases": newData.hortc7 = item.content; break;
                case "Litter": newData.hortc8 = item.content; break;
                case "Surface rooting": newData.hortc9 = item.content; break;
                case "Life Span": newData.hortc10 = item.content; break;
                default: break;
            }
        });

        console.log(newData);

        res.render('modifyplant', {plant: newData});
    }
    else
        res.send('<h2> No Plant </h2>');
});

router.post('/update/:id',upload, AdminController.updatePlant);


router.get("/PlantAdminProfile/:CommonName" , AdminController.PlantProfile);

router.get("/admincontact" , AdminController.Contact);

router.get("/deleteContact/:id" , AdminController.deleteContact);

router.post("/reply/:email" , AdminController.reply);

router.post('/add', upload,AdminController.addPlant);

router.get('/deletePlant/:id', AdminController.deletePlant);

//search for plant
router.post("/searchByName",AdminController.searchPlantByName);

router.get("/searchByLetter/:Letter",AdminController.searchPlantByLetter);

module.exports = router;