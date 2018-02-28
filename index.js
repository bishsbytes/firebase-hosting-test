const functions = require('firebase-functions');
const server = require('./server').server

// Seems we need to prepend '/' for Firebase functions
exports.express = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return server(request, response)
})

// exports.express = functions.https.onRequest(server)