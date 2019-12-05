var express = require('express');
var app = express();
var router = require('express').Router();
var Supplement = require('../models/supplement');
var constants = require('../config/constants');

var fastcsv = require('fast-csv');
var request = require('request');
var fs = require('fs');

// MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
//
// (1) get all supplements with a stock value below some threshold (e.g. 100)
// (2) set pending_order - field for each of these supplements to "true" 
// (3) create csv file containing the supplements mentioned in (1)
// (4) upload the csv-file mentioned in (3) to some dropbox-account.
// TODO : GET is dramatically wrong here ! Change to PUT or PATCH.

router.get('/', (req, res) => {

    Supplement.find({stock: {$lt: constants.STOCK_ORDER_THRESHOLD}, pending_order: {$ne: true}}).lean().then((supplements) => {
       
        for (i = 0; i < supplements.length; i++) {
            console.log(supplements[i]);

            Supplement.findOne({sku: supplements[i].sku}).then((tempsup) => {

                tempsup.pending_order = 1;     
     
                tempsup.save().then((sp) => {

                console.log("pendig-flag set...");
                });

            });

        } // end of for 

//      if(supplements.length > 0) {
//
//
//            var fn = build_csv(supplements);
//            upload_to_dropbox(fn);
//          
//      }

        res.json(supplements);
            


    }); // end of find


});

function build_csv(supplements){

    var filename = "supplements_order_" + Date.now() + ".csv";
    var ws = fs.createWriteStream(filename);

    fastcsv.write(supplements, { headers: true }).pipe(ws);

    return filename;

}

// not in use
function upload_to_dropbox(fn){


    //var access_token = "sv6-iaO0MNAAAAAAAAAADF70rNsGbESKEXfvrFeTG24PkcZwOgflb4m5pAGaFyxC";
    var access_token = constants.DROPBOX_TOKEN; 
    var filename = fn;
    var content = fs.readFileSync(filename);
    var options = { 
                method: "POST",
                url: 'https://content.dropboxapi.com/2/files/upload',
                headers: {
                  "Content-Type": "application/octet-stream",
                  "Authorization": "Bearer " + access_token,
                  "Dropbox-API-Arg": "{\"path\": \"/a_challenge_data/"+filename+"\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
                },
                body:content
    };

    request(options,function(err, res,body){
         console.log("Err : " + err);
         console.log("res : " + res);
         console.log("body : " + body);    
     })

}

module.exports = router;

