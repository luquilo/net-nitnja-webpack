import { initializeApp } from 'firebase/app'
import {
    collection, getFirestore,
    //used to add a new document and delete to a spesific collection
    addDoc, deleteDoc, doc, onSnapshot,
    query, where,
    orderBy, serverTimestamp

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

// collection ref => queries reference
const colRef = collection(db, 'books') 

// query 'where'
// , where("author", '==', 'penulis ganjil')
// where take 3 arguments, default is ascending 
const q = query(colRef, orderBy('createdAt'))

// real time collection data
// on this snapshot object we have access to all of the document collection
// the second arg will run initially and every time there is changes in the collection 
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((document) => {
        books.push({ ...document.data(), id: document.id })
    })
    console.log(books)
})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // addDoc (adding document to the firestore)
    // the first argument is collection argument
    // the second arg is an object that represent the new document that we gonna add (coming from front-end) to the particular collection
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
    })

})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // make a document referece using 'doc' function from firebase
    // take 3 arg, the database, the collection, and the id 
    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

})

