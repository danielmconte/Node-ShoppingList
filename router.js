const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const boats = require('./fakeDb')

router.get('/', function (req, res) {
    res.json({boats}) 
})

router.post('/', function (req, res){
    const newBoat = req.body.vesselName 
    let slip;
    for (let boat in boats) {
        if(boats[boat].vacant && !boats[boat].vesselName){
            boats[boat].vesselName = newBoat;
            boats[boat].vacant = false;
            slip = boats[boat].slipNumber
            break;
        }
    }
    res.json({ slipNumber: slip  || "There are no more vacancies."} )
})


router.put('/:slip/vacate', function(req,res) {
    const slipNumber =  req.params.slip;
    if (slipNumber > 3 || !boats[slipNumber - 1].vesselName) {
        res.json(`There is no boat docked with slip ${slipNumber}!`);
        throw new ExpressError(`There is no boat docked with slip ${slipNumber}`, 404)
    }
    delete boats[slipNumber - 1].vesselName;
    boats[slipNumber -1].vacant = true; 
    res.status(204).json();
})



module.exports = router;