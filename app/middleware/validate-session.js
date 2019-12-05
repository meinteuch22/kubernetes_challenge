var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');


module.exports = (req, res, next) => {

    var sessionToken = req.headers.authorization;

    if(!req.body.user && sessionToken){
        console.log("no user but a token");
        console.log("found token : "+ sessionToken);
        jwt.verify(sessionToken, constants.JWT_SECRET, (err, decodedPayload) => {
            if(decodedPayload) {

                console.log("decoded_id : "+ decodedPayload.id);

                User.findOne({_id: decodedPayload.id}).then((user) => {
                    req['user'] = user;
                    next();

                },(err) => {
               
                    res.send('401','not authorized');

                });


            } else {
                res.send('401', 'not authorized');
            }

        }

        );


    } else {

        console.log("proceeding without a token...");
        next();
    }

};
