const config = require("config");
const express = require('express');
const auth = require("../auth");

const router = express.Router()
const Nexmo = require("nexmo");


/***
 * Send SMS API will authenticate only with an api key
 */

router.post('/api/send-sms:apiKey',(req,res) => {
  const { to, from, sms } = req;

  if (to === "" || from === "" || sms) {
    res.status(500).json({ message: "Error sending sms please check your parameters" });
  }

  let text = sms;

  const nexmo = new Nexmo({
    apiKey: process.env.nexmo_key || config.get('nexmo_key'),
    apiSecret: process.env.nexmo_id || config.get('nexmo_id')
  });

  nexmo.message.sendSms(from, to, text, (err, resData) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      if (resData.messages[0]["status"] === "0") {
        res.status(200).json({message:"message sent successfully"});
      } else {
        res.status(500).json({ error: `${resData.messages[0]["error-text"]}` });
      }
    }
  });


});


module.exports = router;