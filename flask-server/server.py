from flask import Flask, jsonify
from flask_cors import CORS
import requests

apiKey = '043dbee2fe864fd8bb3fb12c19274d42'

app = Flask(__name__)
CORS(app, resources={r'/*': {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})

@app.route("/customer")
def customers():
    data = getCustomers()
    print(data)  # Log the data to verify its structure
    return jsonify(data), 200

def getCustomers():
    url = f'http://api.nessieisreal.com/customers?key={apiKey}'
    response = requests.get(url, headers={
    "Content-Type": "application/json"
    })

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Error: {response.status_code} - {response.text}"}

if __name__ == "__main__":
    app.run(debug=True)