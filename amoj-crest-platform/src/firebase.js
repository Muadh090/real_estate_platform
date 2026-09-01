// Firebase configuration - Replace with your actual Firebase config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collections
export const propertiesCollection = collection(db, 'properties');

// Add property
export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(propertiesCollection, propertyData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding property: ", e);
    throw e;
  }
};

// Get all properties
export const getProperties = async () => {
  try {
    const querySnapshot = await getDocs(propertiesCollection);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });
    return properties;
  } catch (e) {
    console.error("Error getting properties: ", e);
    throw e;
  }
};

// Delete property
export const deleteProperty = async (id) => {
  try {
    await deleteDoc(doc(db, 'properties', id));
  } catch (e) {
    console.error("Error deleting property: ", e);
    throw e;
  }
};

// Update property
export const updateProperty = async (id, data) => {
  try {
    await updateDoc(doc(db, 'properties', id), data);
  } catch (e) {
    console.error("Error updating property: ", e);
    throw e;
  }
};

// Upload image
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (e) {
    console.error("Error uploading image: ", e);
    throw e;
  }
};
