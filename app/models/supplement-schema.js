var db = require('../config/db');

var SupplementSchema = db.Schema({

    name: String,
    manufacturer: String,
    sku: String,
    vendorId: String,
    stock: Number,
    size: String,
    active_ingredient: String,
    pending_order: Boolean

});

module.exports = SupplementSchema;
