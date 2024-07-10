import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCLrj_i4uwnpBuFNzSGHAp4PZ9vD1TM0c0',
  authDomain: 'reactlinks-c558c.firebaseapp.com',
  projectId: 'reactlinks-c558c',
  storageBucket: 'reactlinks-c558c.appspot.com',
  messagingSenderId: '46599083964',
  appId: '1:46599083964:web:766b286f0209e822c5fdb9',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
