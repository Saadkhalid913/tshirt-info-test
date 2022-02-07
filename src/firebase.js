import { initializeApp } from 'firebase/app';

import { getDatabase,ref,set,push,get } from "firebase/database"

const firebaseConfig = {
    apiKey: 'AIzaSyBnIiqkbhcklKwZQe683RrZwNnIRzLLM5Q',
    authDomain: 'remi-50664.firebaseapp.com',
    projectId: 'remi-50664',
    storageBucket: 'remi-50664.appspot.com',
    messagingSenderId: '36683103069',
    appId: '1:36683103069:web:795ff5950cd445f855c6b4',
    measurementId: 'G-ERW15KRM2B'
  };

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export async function addImage(imageID, base64String) {
    const dataRef = ref(db, `/nft_previews/${imageID}`)
    set(dataRef, base64String).then(r => console.log(r))
}

export async function getImageFromFirebase(imageID) {
    const dataRef = ref(db, `/nft_previews/${imageID}`)
    const response = await get(dataRef)
    return response.val()
}



