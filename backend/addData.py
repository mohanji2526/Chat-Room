from flask import jsonify
from supabase import create_client, Client
import os
import dotenv
dotenv.load_dotenv()

# 1. Pull the URL and Key securely from the environment
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(supabase_url, supabase_key)


def insert_data(name, sender_email, message_body):
    try:
        # Prepare the data you want to insert
        new_contact = {
            "name": name,
            "email": sender_email,
            "message": message_body
        }

        # Insert into the database
        response = supabase.table("UserData").insert(new_contact).execute()

        # If successful, response.data will contain the row that was just inserted
        print("Success! Data inserted:")
        print(response.data)

    except Exception as e:
        print(f"Error inserting data: {e}")

   

def handle_contact_form(name, sender_email, message_body):
    try:
        
        # Basic backend validation
        if not name or not sender_email or not message_body:
            return jsonify({"error": "Missing required fields"}), 400
        
        # Insert data into Supabase
        result = insert_data(name, sender_email, message_body)
        
        return jsonify({"message": "message received!", "data": result}), 200
    
         
    except Exception as e:
        print(f"Error adding data to CSV: {e}")
        return jsonify({"error": "Failed to add data in CSV"}), 500
