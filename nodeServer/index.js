const express = require('express');
const admin = require('firebase-admin');
const {initializeApp, getApps} = require('firebase-admin/app');
const app = express();
const port = 3000;
const credential = require('./data/firebasesecret.json');

const cors = require('cors');
let whitelist = ['http://127.0.0.1:3000', 'http://192.168.1.113:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

// Check if app already initialized exists
if (getApps().length == 0) {
  initializeApp({
    credential: admin.credential.cert(credential),
  });
}

// Signup API
const signup = require('./setadmin');
app.use('/setadmin', signup);

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
