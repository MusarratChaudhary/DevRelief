from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app) 

# Configure Gemini API with key from .env
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

@app.route('/api/fix', methods=['POST'])
def fix_error():
    data = request.json
    error_text = data.get('error')
    if not error_text:
        return jsonify({'error': 'No error provided'}), 400

    prompt = f"You are a Java runtime exception fixer. Only answer for Java runtime exceptions. If the error is not from Java runtime, reply: 'This tool only works for Java runtime exceptions.' Now fix this Java runtime exceptions briefly.Constraints: 2-3 line simple english explanation of the error, Provide 3-5 short and clear steps to solve it in simple, Show 1 minimal and easy Java code block with the correct fix: {error_text}"
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')  
        response = model.generate_content(prompt)
        solution = response.text
        return jsonify({'solution': solution})
    except Exception as e:
        return jsonify({'error': f"AI error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)