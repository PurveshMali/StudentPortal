from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
API_KEY = "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"  # Use your actual Hugging Face token

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    data = {"inputs": user_input}

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        try:
            reply = response.json()[0]["generated_text"]
        except Exception as e:
            reply = "Sorry, I couldn't understand that."
    else:
        reply = "Sorry, I'm having trouble responding."

    return jsonify({"reply": reply})

if __name__ == "_main_":
    app.run(debug=True)