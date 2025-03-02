from flask import Flask, jsonify, request
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

@app.route("/submit-email", methods=["POST"])
def submit_email():
    email = request.json.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Log the email (you can add any additional logging or processing here)
    print(f"Email submitted: {email}")

    return jsonify({"message": "Email successfully submitted!"}), 200

@app.route("/buy-item", methods=["POST"])
def buy_item():
    email = request.json.get("email")
    price = request.json.get("price")
    if not email or not price:
        return jsonify({"error": "Email and price are required"}), 400

    account = findAccountByEmail(email)
    if not account:
        return jsonify({"error": "Account not found"}), 404

    new_balance = account["balance"] - float(price)
    if new_balance < 0:
        return jsonify({"error": "Insufficient funds"}), 400

    updateAccountBalance(account["_id"], new_balance)
    return jsonify({"message": "Purchase successful"}), 200

def getCustomers():
    url = f'http://api.nessieisreal.com/customers?key={apiKey}'
    response = requests.get(url, headers={
    "Content-Type": "application/json"
    })

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Error: {response.status_code} - {response.text}"}

def findAccountByEmail(email):
    url = f'http://api.nessieisreal.com/accounts?key={apiKey}&email={email}'
    response = requests.get(url, headers={
    "Content-Type": "application/json"
    })

    if response.status_code == 200:
        accounts = response.json()
        if accounts:
            return accounts[0]  # Assuming the first account is the one we want
    return None

def updateAccountBalance(account_id, new_balance):
    url = f'http://api.nessieisreal.com/accounts/{account_id}?key={apiKey}'
    payload = {
        "balance": new_balance
    }
    response = requests.put(url, json=payload, headers={
    "Content-Type": "application/json"
    })

    if response.status_code == 202:
        return response.json()
    else:
        print("Account balance update failed:", response.text)  # Log the error response
        return None

if __name__ == "__main__":
    app.run(debug=True)