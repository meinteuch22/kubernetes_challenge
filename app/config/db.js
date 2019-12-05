var db = require('mongoose');

var user = process.env.DB_USERNAME;
var pwd  = process.env.DB_PASSWORD;

db.connect('mongodb://' + user + ':' + pwd + '@challengedocumentdbcluster.cluster-ctmxmlergysp.eu-central-1.docdb.amazonaws.com:27017/supplements?authSource=admin&replicaSet=rs0').then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


module.exports = db;


