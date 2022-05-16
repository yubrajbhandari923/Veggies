const api = require('express');
const router = api.Router();
const {getAuth} = require('firebase-admin/auth');

router.use(api.json());

router.post('/', async (req, res, next) => {
  // Farmer Set to Admin APi
  // This api should be called when a new user registers but as a farmer
  // So, we set the custom calims to admin
  // A UID should be passed in the request body

  let {email, password, name} = req.body;

  await getAuth()
    .createUser({
      email: email,
      password: password,
      displayName: name,
    })
    .then(user => {
      getAuth().setCustomUserClaims(user.uid, {admin: true});
    })

    .then(() => {
      res.json({success: true});
    })
    .catch(err => {
      res.status(500);
      res.json(err);
      //
      console.log(err);
    });
});

module.exports = router;
