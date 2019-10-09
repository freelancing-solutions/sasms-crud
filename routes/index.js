
const sms_router = require('./sms-router');
const email_router = require('./email-routes');
const fax_router = require('./fax-routes');
module.exports={
    sms_router : sms_router,
    email_router : email_router,
    fax_router : fax_router
};