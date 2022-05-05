require("firebase/compat/auth");
require("firebase/compat/firestore");
require("dotenv").config();
const app = require("firebase/compat/app");

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const posts = db.collection("posts");
const uid = "";

const login = async () => {
  try {
    uid = await auth.signInWithEmailAndPassword("jlh77", "password");
  } catch (err) {
    alert(`Error: ${err}`);
  }
};

const makePosts = async () => {
  posts.doc().set({
    title: "This is a test food",
  });
};
