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
    res.send('hooray');
});

app.post("/api/send-mail:apiKey", (req, res) => {
  const { to, from, subject, text, html } = req;
  if (
    to === "" ||
    from === "" ||
    subject === "" ||
    text === "" ||
    html === ""
  ) {
    res.send("There was an error sending Email please check your fields");
  }
  sendgrid.setApiKey(process.env.sendgrid_api_key || config.get("sendgrid_api_key"));
  sendgrid.send({
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html
  });

  res.send("Message Successfully sent");
});
// send email function

// send sms function
app.post('/api/send-sms:apiKey',(req,res) => {
  const { to, from, sms } = req;

  if (to === "" || from === "" || sms) {
    res.send("Error sending sms please check your parameters");
  }

  let text = sms;

  const nexmo = new Nexmo({
    apiKey: process.env.nexmo_key || config.get('nexmo_key'),
    apiSecret: process.env.nexmo_id || config.get('nexmo_id')
  });

  nexmo.message.sendSms(from, to, text, (err, resData) => {
    if (err) {
      res.send(err);
    } else {
      if (resData.messages[0]["status"] === "0") {
        res.send("message sent successfully");
      } else {
        res.send(
          `Message failed with error: ${resData.messages[0]["error-text"]}`
        );
      }
    }
  });
});
// end of send sms


// send fax function

app.post('/api/:apiKey', (req,res) => {

  const { to, from, cover, pages } = req;
  if (to === "" || from === "" || cover === "" || pages === "") {
    res.send("Error sendig fax");
  }

  // use twilio api to send fax

  res.send("Successfully sent fax");
});

// end of send fax

// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`Articles API Running on  ${PORT} `);    
});

// # Add a simple react single page to explain the api, or else create a separate
// api page to help consume all my APIS, if need should arise i would have to enable payments on heroku to make this happen