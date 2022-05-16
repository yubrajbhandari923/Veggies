const api = require('express');
const router = api.Router();
const {getAuth} = require('firebase-admin/auth');

router.use(api.json());

router.post('/', async (req, res, next) => {
  let {uid, phone} = req.body;

  await getAuth()
    .updateUser(uid, {
      phoneNumber: phone,
    })
    .then(v => {
      console.log(`Updated ${uid} phone number to ${phone}`);
      res.json({message: 'Successfully updated phone number'});
    })
    .catch(err => {
      res.status(500);
      res.json(err);
      console.log(err);
    });
});

module.exports = router;
