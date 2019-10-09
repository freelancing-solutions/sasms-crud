const config = require("config");
const User = require("../database/Schema").User;
const Accounts = require("../database/Schema").Accounts;


const Auth = async apiKey => {    
    await User.find({ api_key: apiKey}).exec().then(user => {
        return user;
      })
      .catch(error => {
          console.error(error);
          return null;
      });
};

const Account = async apiKey => {
    await Accounts.find({api_key : apiKey}).exec().then(acc => {
        return acc;
    }).catch(error => {
        console.error(error);
        return null;
    });
};

module.exports ={
    authenticate : Auth,
    get_account : Account
};