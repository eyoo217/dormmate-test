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
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    if not email or not first_name or not last_name:
        return jsonify({"error": "Email, first name, and last name are required"}), 400

    # Log the email, first name, and last name (you can add any additional logging or processing here)
    print(f"Email submitted: {email}, First Name: {first_name}, Last Name: {last_name}")

    return jsonify({"message": "Email successfully submitted!"}), 200

@app.route("/buy-item", methods=["POST"])
def buy_item():
    email = request.json.get("email")
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    price = request.json.get("price")
    if not email or not first_name or not last_name or not price:
        return jsonify({"error": "Email, first name, last name, and price are required"}), 400

    account = findAccountByEmail(email)
    if not account:
        return jsonify({"error": "Account not found"}), 404

    new_balance = account["balance"] - float(price)
    if new_balance < 0:
        return jsonify({"error": "Insufficient funds"}), 400

    update_result = withdraw_balance(account["_id"], float(price), apiKey)
    if update_result:
        return jsonify({"message": "Purchase successful"}), 200
    else:
        return jsonify({"error": "Failed to update account balance"}), 500

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

def withdraw_balance(account_id, amount, api_key):
    url = f"http://api.nessieisreal.com/accounts/{account_id}/withdrawals?key={api_key}"
    payload = {
        "medium": "balance",
        "transaction_date": "2025-03-01",
        "amount": amount,
        "description": "Purchase withdrawal"
    }
    print(f"Withdrawing from account with payload: {payload}")  # Log the payload
    response = requests.post(url, json=payload)
    
    if response.status_code == 201:
        print("Account updated successfully!")
        return True
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return False

if __name__ == "__main__":
    app.run(debug=True)