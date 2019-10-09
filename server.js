const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");

const cron = require("node-cron");
// TODO- please finish up and make use of cron-jobs to create a great api



const routes = require('./routes');

const PORT = process.env.PORT || 3030;

const redis = require("redis");
const cache_config = { redis: process.env.REDIS_URL || config.get("redis") };
const cache = require("express-redis-cache")({
  client: redis.createClient(cache_config.redis)
});

cache.on("connected", () => {
  // ....
  console.log("cache connected");
});
cache.on("disconnected", () => {
  // ....
  console.log("cache disconneted");
});

// create express app
const app = express();

// parse reqs of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse reqs of content-type - application/json
app.use(bodyParser.json());

// adding cors
app.use(cors());


app.get('/',(req,res) => {
    res.status(200).json({message:'welcome to sa-sms crud api'});
});


/**
 * all sms related routes
 */
app.use(routes.sms_router);

/**
 * all email related routes
 */
app.use(routes.email_router);


/**
 * all fax related routes
 */

 app.use(routes.fax_router);
 

// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`sa sms rest api running on port :  ${PORT} `);    
});

// # Add a simple react single page to explain the api, or else create a separate
// api page to help consume all my APIS, if need should arise i would have to enable payments on heroku to make this happen