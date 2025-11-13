from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from google import genai
import os
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration
CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://dev-relief.vercel.app"
        ]
    }},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "OPTIONS"]
)

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

# Database & JWT Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Gemini API Client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    error_text = db.Column(db.Text, nullable=False)
    solution_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# Signup
@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200

    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Login
@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200

    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'token': access_token}), 200
    return jsonify({'error': 'Invalid email or password'}), 401

# Fix Error (AI)
@app.route('/api/fix', methods=['POST', 'OPTIONS'])
@jwt_required()
def fix_error():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200

    user_id = get_jwt_identity()
    data = request.json
    error_text = data.get('error')

    if not error_text:
        return jsonify({'error': 'No error provided'}), 400

    # Choose AI model dynamically
    if len(error_text) > 300 or "Exception" in error_text or "Traceback" in error_text:
        model_to_use = "gemini-2.5-pro"   # for complex errors
    else:
        model_to_use = "gemini-flash-latest"  # for simple quick fixes

    prompt = f"""
        You are a Java error and exception fixer. 
        Always keep your response short, clear, and educational for Java errors only.
    
        *** Error Explanation: ***
        Give a short, simple 2–3 line explanation of what this error means and why it happens.

        *** Steps To Solve: ***
        Provide 3–5 short, clear steps in a numbered list that explain how to fix this issue.

        *** Corrected Java Code: ***
        ```java
        <Correct code here>
        {error_text}

        """

    try:
        response = client.models.generate_content(
            model=model_to_use,
            contents=prompt
        )

        solution = response.text
        new_history = History(user_id=user_id, error_text=error_text, solution_text=solution)
        db.session.add(new_history)
        db.session.commit()

        return jsonify({'solution': solution, 'model_used': model_to_use}), 200

    except Exception as e:
        return jsonify({'error': f"AI error: {str(e)}"}), 500

# History
@app.route('/api/history', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_history():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'CORS preflight passed'}), 200

    current_user = get_jwt_identity()
    history_items = History.query.filter_by(user_id=current_user).order_by(History.timestamp.desc()).all()

    return jsonify([{
        'id': item.id,
        'error': item.error_text,
        'solution': item.solution_text,
        'timestamp': item.timestamp.isoformat()
    } for item in history_items]), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)




































