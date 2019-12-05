var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// middleware for access-control reasons.see below
function userrights (req,res,next){

    if('user' in req){
        if(req.user.access.indexOf(req.method.toUpperCase()) > -1){
            next();
         } else {
    
            console.log("User request a " + req.method + ", but is only allowed to do " + req.user.access) 
            res.send('401','not authorized');
         }
     } else {

            console.log("client not logged in / with invalid token ?") 
            res.send('401','not authorized');

     }

}

var acl_check = [ userrights ];

app.use(bodyParser.json());

app.use(require('./middleware/headers'));


// check for the webtoken (in case it's not a POST to "api/users"
// or a POST to "api/login")
app.use(require('./middleware/validate-session'));

// CRUD users
app.use('/api/users', require('./routes/users'));

// user login
app.use('/api/login', require('./routes/sessions'));

// ORDER supplements low on stock
app.use('/api/supplements/order', acl_check, require('./routes/order'));

// CRUD supplements 
app.use('/api/supplements', acl_check, require('./routes/supplements'));

// health - checks etc
app.use('/api/healthy', require('./routes/checks'));
app.use('/api/ready', require('./routes/checks'));

app.listen(3000,function(){

    console.log('app is listening on port 3000...');

});


