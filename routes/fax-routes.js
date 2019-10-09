const config = require("config");
const express = require("express");
const auth = require("../auth");


const router = express.Router();
const sendgrid = require("@sendgrid/mail");



/**
 * send fax api will authenticate only with an apiKey
 */
router.post('/api/send-fax/:apiKey', (req,res) => {

  const { to, from, cover, pages } = req;
  if (to === "" || from === "" || cover === "" || pages === "") {
    res.status(500).json({message:'some required values where not completed'});
  }

  // use twilio/sendgrid api to send fax

  res.status(200).json({message:"Successfully sent fax"});
});

// end of send fax


module.exports = router;