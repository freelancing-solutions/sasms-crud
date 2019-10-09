# SA SMS API

an sms api built using node.js express node-cron and redis.

## API Definition

info:

- title: article search
- description: used to search news sites for articles version: '0.1'
- servers:
  - \*\* - url: 'https://mobius-articles.herokuapp.com'
- paths:
  - \*\* /search/:SearchTerm
    - \*\*\* get:
      - \*\*description: send a request to our api and in turn get a json response with a list of articles
      - \*\* responses: '200':
      - \*\* description: an array of json objects containing the results of your search      