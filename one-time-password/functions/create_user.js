const admin = require('firebase-admin');

module.exports = (req, res) => {
  // Verify the user provided us a phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input.' })
  }

  // Format the phone number to use dashes and parens
  // what the RegEx does is if any thing within the string is not a digit, it
  // will be replaced with an empty string.
  const phone = String(req.body.phone).replace(/[^\d]/g, "");


  // Create a new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
  // Respond to the user request, saying the account was made
}
