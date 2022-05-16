const api = require('express');
const router = api.Router();
const {getAuth} = require('firebase-admin/auth');

router.use(api.json());

router.post('/', async (req, res, next) => {
  let {uid, ...address} = req.body;

  console.log(req.body);

  await getAuth()
    .setCustomUserClaims(uid, {address: address})
    .then(v => {
      console.log(`Updated address of ${uid}`);
      res.json({
        message: 'Successfully updated address',
        code: 'server-success',
      });
    })
    .catch(err => {
      res.status(500);
      res.json(err);
      //
      console.log(err);
    });
});

module.exports = router;
