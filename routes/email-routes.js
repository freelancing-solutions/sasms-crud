const config = require('config');
const express = require("express");
const auth = require("../auth");


const router = express.Router();
const sendgrid = require("@sendgrid/mail");


/**
 * Send Email EndPoint, will make use of an API Key to send email
 */
router.post("/api/send-mail:apiKey", (req, res) => {
  const { to, from, subject, text, html } = req;
  if (
    to === "" ||
    from === "" ||
    subject === "" ||
    text === "" ||
    html === ""
  ) {
    res.status(500).json({message:"There was an error sending Email please check your fields"});
  }

  auth.authenticate(req.params.apiKey).then(result => {
    if(result){
        auth.get_account(req.params.apiKey).then(result => {
            // check if user has enough credits
          sendgrid.setApiKey(process.env.sendgrid_api_key || config.get("sendgrid_api_key"));
          sendgrid.send({
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: html
          });

          // subtract credits equal to a single email sent
        
          res.status(200).json({ message: "Message Successfully sent" });
        }).catch(error => {
          res.status(500).json(error);
        });
    }else{
      // user is not found
      res.status(500).json({message : 'invalid api key please register and create an api key before using this api'});
    }
  }).catch(error => {
    res.status(500).json(error);
  });
  
});
// send email function

module.exports = router;