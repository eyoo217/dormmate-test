import requests
import json


apiKey = 'your-api-key'

def getAccountsForCustomer(customer_id: str): #Output: all accounts of that customer with all Account ID's Input: Cust_ID
    """
    Retrieves all accounts for a given customer ID from the Capital One Nessie API.
    
    - `customer_id`: (str) The unique ID of the customer.
    """
    url = f'http://api.nessieisreal.com/customers/{customer_id}/accounts?key={apiKey}'

    # Send the GET request
    response = requests.get(url)

    # Process the response
    if response.status_code == 200:
        accounts = response.json()
        if accounts:  # Ensure there's at least one account
            print(" Accounts retrieved successfully!")
            for account in accounts:
                print(f"Account ID: {account['_id']} | Type: {account['type']} | Balance: ${account['balance']}")
            return accounts
        else:
            print(" No accounts found for this customer.")
            return None
    else:
        print(f" Error: {response.status_code} - {response.text}")
        return None
    

getAccountsForCustomer('customer_id')
