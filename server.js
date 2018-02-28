const express = require('express');
const session = require('express-session');
const cors = require('cors');
const functions = require('firebase-functions');
const FirebaseStore = require('connect-session-firebase')(session);
const firebase = require('firebase-admin');

const ref = firebase.initializeApp({
  credential: firebase.credential.cert('./credentials/serviceAccountCredentials.json'),
  databaseURL: functions.config().fb.db
});

const server = express();

var sess = {
  name: '__session',
  secret: functions.config().express.secret,
  cookie: {},
  store: new FirebaseStore({
    database: ref.database()
  }),
}

if (server.get('env') === 'production') {
  server.set('trust proxy', 1)
  // Secure cookies not working with Firebase hosting
  // sess.cookie.secure = true
}

const context = {};

server
  .use(cors({ origin: true }))
  .use(session(sess))
  .get('/*', (req, res) => {
    req.session.visits = req.session.visits + 1 || 0
    res.json({ hello: 'world', visits: req.session.visits })
  });

module.exports.server = server;