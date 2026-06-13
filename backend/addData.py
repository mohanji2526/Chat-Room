import os
from supabase import create_client, Client
import dotenv

# Load local .env file (Render will safely ignore this and use its environment panel)
dotenv.load_dotenv()

# 1. Pull credentials securely from the environment
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# 2. Initialize the client only if variables exist to prevent crashes
supabase = None
if supabase_url and supabase_key:
    # .strip() cleans up any accidental hidden spaces or line breaks from copying
    supabase: Client = create_client(supabase_url.strip(), supabase_key.strip())

def insert_data(name, sender_email, message_body):
    """
    Inserts contact form data directly into the Supabase 'UserData' table.
    Returns the inserted row data if successful, or None if it fails.
    """
    try:
        if not supabase:
            print("Error: Supabase client is not initialized. Check your Environment Variables.")
            return None

        # Prepare the row payload matching your Supabase columns exactly
        new_contact = {
            "name": name,
            "email": sender_email,
            "message": message_body
        }

        # Execute the insert query
        response = supabase.table("UserData").insert(new_contact).execute()
        
        print("Success! Data inserted into Supabase:", response.data)
        return response.data

    except Exception as e:
        print(f"Error inserting data into Supabase: {e}")
        return None