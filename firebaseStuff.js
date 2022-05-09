require("firebase/compat/auth");
require("firebase/compat/firestore");
require("dotenv").config();
const firebase = require("firebase/compat/app");

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

exports.app = app = firebase.initializeApp(firebaseConfig);
exports.auth = auth = app.auth();
exports.db = db = app.firestore();

exports.login = async () => {
  try {
    const cred = await auth.signInWithEmailAndPassword(
      `theconcocter@gmail.com`,
      "password"
    );
    return cred.user.uid;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
