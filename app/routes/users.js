var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');


router.post('/', (req,res) => {

    var user = new User({
      username: req.body.user.username,
      email: req.body.user.email,
      passhash: bcrypt.hashSync(req.body.user.pwd, 10),
      access: req.body.user.access

    });

    // save to mongodb    
    user.save().then(
        (newuser) => {
            var sessionToken = jwt.sign({id: newuser._id}, constants.JWT_SECRET, { expiresIn: 60*60*24*7});
            res.json({
                user: newuser,
                message: 'success',
                token: sessionToken
            });

        },
        (err) => {
            res.send(500, err.message)
        }


    );

});

module.exports = router;

