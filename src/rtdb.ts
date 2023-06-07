import * as dotenv from 'dotenv';
dotenv.config()
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from "firebase/database"


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: 'cap3-mod6-apx'
};

const app = initializeApp(firebaseConfig);

const rtdbFirebase = getDatabase();

export { rtdbFirebase }