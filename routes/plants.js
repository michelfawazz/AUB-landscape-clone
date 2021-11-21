const express = require('express');
const router = express.Router();

const Plants = require('../models/plant');


// add plants
router.post('/', (req, res) => {


   
    
});



//search for plant
router.get('/:id', (req, res) => {
    

});


// view all plants
router.get('/', (req, res) => {
    
});


//view a plants profile
router.get('/:id', (req, res) => {
} );

//modify a plants profile
router.patch('/:id', (req, res) => {
} );

//delete a plant
router.delete('/:id', (req, res) => {
} );


//reply to contact form
router.post('/contact', (req, res) => {
} );





module.exports = router;

