import { initializeApp } from 'firebase/app';

import { getDatabase,ref,set,push,get } from "firebase/database"
import  { ref as storageRef, uploadBytes, getStorage, getDownloadURL } from "firebase/storage"

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
const storage = getStorage(app)


export async function getImageFromStorage(imageID) {
    const dataRef = storageRef(storage, `/nft_previews/${imageID}`)
try {
    const result = await getDownloadURL(dataRef)
    return result
}    
catch(err) {
    return null
}
}
export async function addImage(imageID, base64) {
    const dataRef = storageRef(storage, `/nft_previews/${imageID}`)
    const data = await fetch(base64)
    const existing = await getImageFromStorage(imageID)
    if (existing) return 
    const file = await data.blob()
    uploadBytes(dataRef, file).then(r => console.log(r))
    console.log("Done Uploading new shirt")
}

export async function getImageFromFirebase(imageID) {
    const dataRef = ref(db, `/nft_previews/${imageID}`)
    const response = await get(dataRef)
    return response.val()
}



