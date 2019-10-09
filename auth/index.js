const config = require("config");
const User = require("../database/Schema").User;
const Account = require("../database/Schema").Accounts;

const Auth = async user => {
    User.find(User.api_key === user.api_key,(err,res) => {
        if(err){
            return null
        }else{
            return res;
        }
    });
};