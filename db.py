import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
from dotenv import load_dotenv
load_dotenv()
import os


cred = credentials.Certificate('key.json')

firebase_admin.initialize_app(cred, {
    "databaseURL": os.getenv('FIREBASE_DB_URL')
})

rooms_ref = db.reference("rooms/")

dbFirestore = firestore.client()