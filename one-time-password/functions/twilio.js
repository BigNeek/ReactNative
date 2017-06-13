const twilio = require('twilio');

const accountSid = 'ACc50c81b16b32905ab760b2f83b5aac75';
const authToken = '873be218859288cc41af7a6be04eab0f';

module.exports = new twilio.Twilio(accountSid, authToken);
