import { initializeApp } from 'firebase/app'
import {
    collection,
    getDocs,
    getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAR-235lsX9cW3RFcvYqMPXsT3C1tU2-NM",
    authDomain: "fir-ninja-ede9c.firebaseapp.com",
    projectId: "fir-ninja-ede9c",
    storageBucket: "fir-ninja-ede9c.appspot.com",
    messagingSenderId: "126139096183",
    appId: "1:126139096183:web:386b5067f87b3ef8133a72"
};

// init firebase
initializeApp(firebaseConfig)

// init service
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books') 

// get collection data
getDocs(colRef) //on this snapshot object we have access to all of the document
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((document) => {
            books.push({ ...document.data(), id: document.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })