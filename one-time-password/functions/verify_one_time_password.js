const admin = require('firebase-admin');

module.exports = (req, res) => {
  if(!req.body.phone || !req.body.code) {
    res.status(422).send({ error: 'Phone number and code must be provided!' });
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', snapshot => {
        // need to call ref.off() as Google Functions does not allow for any
        // dangling event handlers. The way that .on('value') works is that it
        // will continually listen for any 'value' changes. A google function
        // just runs once and then disapear so this 'dangling' functionality
        // does not work.
        ref.off();
        const user = snapshot.val();

        if (user.code !== code && !codeValid) {
          return res.status(422).send({ error: 'Code not valid' })
        }

        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token: token }));
      });
    })
    .catch((err) => res.status(422).send({ error: err }))
}
