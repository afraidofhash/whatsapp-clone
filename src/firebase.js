// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { getFirestore, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCmzlub6YbXsseUAgKBMRccTd6E8zl4TIA",
    authDomain: "whatsappclone1-ea0c2.firebaseapp.com",
    databaseURL:"https://whatsappclone1-ea0c2-default-rtdb.firebaseio.com",
    projectId: "whatsappclone1-ea0c2",
    storageBucket: "whatsappclone1-ea0c2.appspot.com",
    messagingSenderId: "599088149588",
    appId: "1:599088149588:web:f724b2f336d561b53e29c1",
    measurementId: "G-1QSNENX2W7"
  };

/*   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmzlub6YbXsseUAgKBMRccTd6E8zl4TIA",
  authDomain: "whatsappclone1-ea0c2.firebaseapp.com",
  databaseURL: "https://whatsappclone1-ea0c2-default-rtdb.firebaseio.com",
  projectId: "whatsappclone1-ea0c2",
  storageBucket: "whatsappclone1-ea0c2.appspot.com",
  messagingSenderId: "599088149588",
  appId: "1:599088149588:web:f724b2f336d561b53e29c1",
  measurementId: "G-1QSNENX2W7"
}; */

//const firebaseApp=initializeApp(firebaseConfig)
//const db = firebaseApp.firestore();
//const db=getFirestore(firebaseApp)
//const auth=firebase.auth()
//const provider = new firebase.auth.GoogleAuthProvider()
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();	
const auth = firebase.auth();	
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;