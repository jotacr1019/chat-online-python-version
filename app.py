from flask import Flask, jsonify, request, send_from_directory, render_template
from firebase_admin import firestore
from firebase_admin import db
from db import rooms_ref
from flask_cors import CORS
import uuid
import random
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)

CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

@app.before_request
def preprocess_request():
    content_type = request.content_type
    if content_type and content_type.startswith("application/x-www-form-urlencoded"):
        request.form = request.get_json()

@app.after_request
def add_headers(response):
    response.headers["Content-Type"] = "application/json"
    return response

db = firestore.client()
user_collection = db.collection('users')
rooms_collection = db.collection('rooms')


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    response = user_collection.where('email', '==', email).get()
    if len(response) == 0:
        new_user = {
            'email': email,
            'name': name
        }
        new_user_ref = user_collection.add(new_user)
        new_user_id = new_user_ref[1].id
        return jsonify({'id': new_user_id}), 200
    else:
        return jsonify({'message': 'Email already exists'}), 400


@app.route('/auth', methods=['POST'])
def auth():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    response = user_collection.where('email', "==", email).get()
    if len(response) == 0:
        new_user = {
            'email': email,
            'name': name
        }
        new_user_ref = user_collection.add(new_user)
        new_user_id = new_user_ref[1].id
        return jsonify({'id': new_user_id})
    else:
        first_doc = response[0]
        return jsonify({'id': first_doc.id})


@app.route('/rooms', methods=['POST'])
def create_room():
    data = request.get_json()
    userId = data.get('userId')

    user_doc = user_collection.document(str(userId)).get()
    if user_doc.exists:
        room_ref = rooms_ref.child(str(uuid.uuid4()))
        room_ref.set({
            'owner': userId,
            'messages': []
        })
        long_room_id = room_ref.key
        short_id = 1000 + (random.randint(0, 999))
        rooms_collection.document(str(short_id)).set({
            'rtdbRoomId': long_room_id
        })
        return jsonify({
            'id': short_id,
            'longId': long_room_id
        }), 200
    else:
        return jsonify({
            'message': 'You need a user to create a Room'
        }), 401


@app.route("/rooms/<string:room_id>", methods=["GET"])
def get_room(room_id):
    user_id = request.args.get('userId')
    user_doc = user_collection.document(str(user_id)).get()

    if user_doc.exists:
        room_doc = rooms_collection.document(room_id).get()
        data = room_doc.to_dict()
        return jsonify(data), 200
    else:
        return jsonify({"message": "You need a user to get a room"}), 401


@app.route("/messages", methods=["POST"])
def add_message():
    long_id = request.json["longId"]
    message = request.json["message"]
    user = request.json["user"]
    room_id = request.json["roomId"]

    chat_rooms_ref = rooms_ref.child(f"{long_id}/messages")
    chat_rooms_ref.push({
        "message": message,
        "user": user,
        "roomId": room_id
    })
    return jsonify("Message sent successfully"), 200


@app.route('/dist/<path:filename>')
def serve_static(filename):
    return send_from_directory('dist', filename)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT') or 5005)