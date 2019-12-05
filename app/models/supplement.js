var db = require('../config/db');
var SupplementSchema = require('./supplement-schema');
var Supplement = db.model('Supplement', SupplementSchema);

module.exports = Supplement;
