from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from google import genai
import os
import sqlite3
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Cors config with defined origins and methods for smooth frontend-backend connection

CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:3000",              # for local testing
            "https://dev-relief.vercel.app"  # for actual deployed frontend URL
            ]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "OPTIONS"]
)


# Optional safety: # adding cors headers so frontend and backend can connect properly without cross origin error
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    allowed = [
        "http://localhost:3000",
        "https://dev-relief.vercel.app"
    ]
    if origin in allowed:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response



# configure database connection for storing and managing app data

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')  # Set in .env or use a secure key
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


# api_key = os.getenv("GEMINI_API_KEY")   => old model method (for reference only)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))  # for gemini latest model

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# History Model
class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    error_text = db.Column(db.Text, nullable=False)
    solution_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()
 

# Signup Endpoint
@app.route('/api/signup', methods=['POST','OPTIONS'])
@cross_origin(origin='http://localhost:3000', methods=['POST', 'OPTIONS'], headers=['Content-Type', 'Authorization'], supports_credentials=True)
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200 
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Login Endpoint
@app.route('/api/login', methods=['POST','OPTIONS'])
@cross_origin(origin='http://localhost:3000', methods=['POST', 'OPTIONS'], headers=['Content-Type', 'Authorization'], supports_credentials=True)
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200  
    
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'token': access_token}), 200
    return jsonify({'error': 'Invalid email or password'}), 401

# Fix Error Endpoint (Updated to Save History)
@app.route('/api/fix', methods=['POST','OPTIONS'])
@cross_origin(origin='http://localhost:3000', methods=['POST', 'OPTIONS'], headers=['Content-Type', 'Authorization'], supports_credentials=True)
@jwt_required()   # ensures the route is accessible only for logged-in users
def fix_error():
    user_id = get_jwt_identity()  # fetch the current logged-in user's ID
    data = request.json
    error_text = data.get('error')

    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200  
    if not error_text:
        return jsonify({'error': 'No error provided'}), 400

    prompt = f"""
            You are a Java error and exception fixer. Analyze the given error message or code snippet and provide a clear, correct, and educational solution.

            *** Error Explanation: ***

            Give a short, simple 2–3 line explanation of what this error means and why it happens.

            *** Steps To Solve: ***

            Provide 3–5 short, clear steps in a numbered list that explain how to fix this issue.
            Each step should be written in simple English (avoid technical jargon).

            *** Corrected Java Code: ***
            
            ```java
            <1 minimal and easy Java code block with the correct fix>: {error_text}"""

    try:
        response = client.models.generate_content(
           model = "gemini-flash-latest",
           contents=prompt
    )

        solution = response.text
        
        # Save to history
        new_history = History(user_id=user_id, error_text=error_text, solution_text=solution)
        db.session.add(new_history)
        db.session.commit()
        
        return jsonify({'solution': solution}), 200
    except Exception as e:
        return jsonify({'error': f"AI error: {str(e)}"}), 500


# History Endpoint
@app.route('/api/history', methods=['GET','POST','OPTIONS'])
@cross_origin(origin='http://localhost:3000', methods=['GET', 'OPTIONS'], headers=['Content-Type', 'Authorization'], supports_credentials=True)
@jwt_required()
def get_history():
    current_user = get_jwt_identity()
    history_items = History.query.filter_by(user_id=current_user).order_by(History.timestamp.desc()).all()
    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200 

    return jsonify([{
        'id': item.id,
        'error': item.error_text,
        'solution': item.solution_text,
        'timestamp': item.timestamp.isoformat()
    } for item in history_items]), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)


































