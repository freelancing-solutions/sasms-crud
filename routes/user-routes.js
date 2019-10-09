/***
 * User management routes
 */
const User = require("../database/Schema").User;
const Accounts = require("../database/Schema").Accounts;
const uuidv4 = require("uuid/v4");


const config = require("config");
const express = require("express");
const auth = require("../auth");

const router = express.Router();


// TODO- please add authentication to all this routes
// for example only the owner of the account and also the admin can delete an account

router.get('/api/user/:uid',(req,res) => {
    
    User.find({uid : req.params.uid}).exec().then(user => {
        res.status(200).json(user);
    }).catch(error => {
        console.error(error);
        res.status(500).json(error);
    });

});

/**
 * parameters must include user record
 * uid, name, email, api_key : null
 */

router.post('/api/user',(req,res) => {
    let user = {...req.body.user}; 
    user.api_key = uuidv4(); 
    const newUser = new User(req.params.user);    

    newUser.save().then(user => {
        res.status(200).json(user);
    }).catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
})

/**
 * parametres must include uid
 */

router.delete('/api/user/:uid', (req,res) => {
    const uid = req.params.uid;

    User.deleteOne({uid : req.params.uid}).exec().then(results => {
        if (results.deletedCount > 0){
            res.status(200).json({message:`successfully deleted ${results.deletedCount} records`})
        }else{
            res.status(200).json({message : 'record not found'});    
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({error: error});
    });

})


module.exports = router;

