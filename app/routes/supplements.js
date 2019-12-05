var router = require('express').Router();
var Supplement = require('../models/supplement');

// get all supplements
// ... but observe possible filters of the form
// ...?sku=<sku>&manufacturer=<manufacturer>&...
// see supplement-schema for all possible filter params 

router.get('/', (req, res) => {

    // TODO: delete params that don't match the mongodb-scheme
    Supplement.find(req.query).then((supplements) => {
        res.json(supplements);
    });

});

// create a new supplement 

router.post('/', (req,res) => {

    var sup = new Supplement({
        name: req.body.supplement.name,
        manufacturer: req.body.supplement.manufacturer,
        sku: req.body.supplement.sku,
        vendorId: req.body.supplement.vendorId,
        stock: req.body.supplement.stock,
        size: req.body.supplement.size,
        active_ingredient: req.body.supplement.active_ingredient,
        pending_order: req.body.supplement.pending_order       
    });

    sup.save().then((supplement) => {

        res.json({
            message: 'supplement saved!',
            definition: supplement 
        });

    });

});

// update an existing supplement identified by its sku 

router.put('/:sku', (req,res) => {
    Supplement.findOne({sku: req.params.sku})
    .then((supplement) => {

        supplement.name = req.body.supplement.name;
        supplement.manufacturer = req.body.supplement.manufacturer;
        supplement.sku = req.body.supplement.sku;
        supplement.vendorId = req.body.supplement.vendorId;
        supplement.stock = req.body.supplement.stock;
        supplement.size = req.body.supplement.size;
        supplement.active_ingredient = req.body.supplement.active_ingredient;      
        supplement.pending_order = req.body.supplement.pending_order;      
 
        supplement.save().then((supplement) => {

            res.json({
                message: 'supplement updated!',
                supplement: supplement 
            });

        });

    });

});


// patch an existing supplement identified by its sku 

router.patch('/:sku', (req,res) => {
    Supplement.findOne({sku: req.params.sku})
    .then((supplement) => {

        if("name" in req.body.supplement) { supplement.name = req.body.supplement.name;}
        if("manufacturer" in req.body.supplement) { supplement.manufacturer = req.body.supplement.manufacturer;}
        if("sku" in req.body.supplement) { supplement.sku = req.body.supplement.sku;}
        if("vendorId" in req.body.supplement) { supplement.vendorId = req.body.supplement.vendorId;}
        if("stock" in req.body.supplement) { supplement.stock = req.body.supplement.stock;}
        if("size" in req.body.supplement) { supplement.size = req.body.supplement.size;}
        if("active_ingredient" in req.body.supplement) { supplement.active_ingredient = req.body.supplement.active_ingredient;}      
        if("pending_order" in req.body.supplement) { supplement.pending_order = req.body.supplement.pending_order;}      
 
        supplement.save().then((supplement) => {

            res.json({
                message: 'supplement patched!',
                supplement: supplement 
            });

        });

    });

});




// delete an existing supplement identified by its sku 

router.delete('/:sku', (req,res) => {
    Definition.findOne({sku: req.params.sku})
    .then((supplement) => {
        supplement.remove().then(() => {

            res.json({
                message: 'supplement deleted!',
                supplement: supplement 
            });

        })
    });

});


module.exports = router;

