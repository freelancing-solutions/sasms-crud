# SA SMS API

an sms api built using node.js express node-cron and redis.

## API Definition

info:

- title: bulk sms, email and fax api
- description: api can be used to send sms messages, bulk sms messages. fax messages and bulk fax messages
version: '0.1'
- servers:
  - \*\* - url: 'https://sa-sms.herokuapp.com/'
- paths:
  - \*\* /send-sms
    - \*\*\* post:
      - \*\*description: used to send a single sms message through our api
      - \*\* responses: '200':
      - \*\* description: a json object containing the sent message and also the message_id that can later be used to retrieve message responses

  - \*\* /send-email
    - \*\*\* post:
      - \*\*description: used to send single email message through our api
      - \*\* responses: '200':
      - \*\* description: a json object containing the sent message and also the message_id that can later be used to retrieve message responses


  - \*\* /send-fax
    - \*\*\* post:
      - \*\*description: used to send single fax message through our api
      - \*\* responses: '200':
      - \*\* description: a json object containing the sent message and also the message_id that can later be used to retrieve message responses
      
