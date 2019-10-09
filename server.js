const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const cron = require("node-cron");
// TODO- please finish up and make use of cron-jobs to create a great api

const sendgrid = require("@sendgrid/mail");
const Nexmo = require("nexmo");

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
 * Send Email EndPoint, will make use of an API Key to send email
 */
app.post("/api/send-mail:apiKey", (req, res) => {
  const { to, from, subject, text, html } = req;
  if (
    to === "" ||
    from === "" ||
    subject === "" ||
    text === "" ||
    html === ""
  ) {
    res.status(401).json({message:"There was an error sending Email please check your fields"});
  }
  sendgrid.setApiKey(process.env.sendgrid_api_key || config.get("sendgrid_api_key"));
  sendgrid.send({
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html
  });

  res.status(200).json({ message: "Message Successfully sent" });
});
// send email function

/***
 * Send SMS API will authenticate only with an api key
 */
app.post('/api/send-sms:apiKey',(req,res) => {
  const { to, from, sms } = req;

  if (to === "" || from === "" || sms) {
    res.status(401).json({ message: "Error sending sms please check your parameters" });
  }

  let text = sms;

  const nexmo = new Nexmo({
    apiKey: process.env.nexmo_key || config.get('nexmo_key'),
    apiSecret: process.env.nexmo_id || config.get('nexmo_id')
  });

  nexmo.message.sendSms(from, to, text, (err, resData) => {
    if (err) {
      res.status(401).json({error: err});
    } else {
      if (resData.messages[0]["status"] === "0") {
        res.status(200).json({message:"message sent successfully"});
      } else {
        res.status(401).json({ error: `${resData.messages[0]["error-text"]}` });
      }
    }
  });


});



/**
 * send fax api will authenticate only with an apiKey
 */
app.post('/api/send-fax/:apiKey', (req,res) => {

  const { to, from, cover, pages } = req;
  if (to === "" || from === "" || cover === "" || pages === "") {
    res.status(401).json({message:'some required values where not completed'});
  }

  // use twilio api to send fax

  res.status(200).json({message:"Successfully sent fax"});
});

// end of send fax

// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`sa sms rest api running on port :  ${PORT} `);    
});

// # Add a simple react single page to explain the api, or else create a separate
// api page to help consume all my APIS, if need should arise i would have to enable payments on heroku to make this happen