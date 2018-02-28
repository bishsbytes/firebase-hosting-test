# Prerequisites

1. Clone project and `npm install`

2. Create Firebase project and run `firebase init` in the cloned project directory to link it to the new Firebase project 

1. Grab service account JSON from Firebase project and put in `/credentials`. Ensure it's called `serviceAccountCredentials.json`

2. Set following environment config variables in Firebase (https://firebase.google.com/docs/functions/config-env):

Firebase database URL:

`fb.db = https://<DATABASE_NAME>.firebaseio.com`

Express session secret:

`express.secret = XXX`