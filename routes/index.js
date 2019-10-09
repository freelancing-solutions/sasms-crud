
const sms_router = require('./sms-router');
const email_router = require('./email-routes');
const fax_router = require('./fax-routes');
const user_router = require('./user-routes');

module.exports = {
  sms_router: sms_router,
  email_router: email_router,
  fax_router: fax_router,
  user_router: user_router
};