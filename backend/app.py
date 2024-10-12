from flask import Flask, jsonify, request
from flask_login import LoginManager
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

db.init_app(app)
login_manager = LoginManager(app)

with app.app_context():
    db.create_all()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    print(f"Received registration request: {username}")

    hashed_password = generate_password_hash(password, method='scrypt')

    try:
        new_user = User(username=username, password=hashed_password)
        print(new_user)
        db.session.add(new_user)
        db.session.commit()
        print('created user')
        return jsonify({'message': 'User registered successfully!'})
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return jsonify({'error': 'Registration failed'}), 500


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful!'})
    
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
