import os
from dotenv import load_dotenv
from fastapi import FastAPI
from supabase import create_client, Client

app = FastAPI()

load_dotenv()


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)



@app.get("/hello")
def read_hello():
    return {"message": "Hello, FastAPI!"}

@app.get("/test_connection")
def test_connection():
    try:
        # Use table() method instead of query()
        response = supabase.table("SDLC_Models").select("*").execute()
        return {
            "connection": "successful",
            "count": len(response.data),
            "sample": response.data[:3] if response.data else []
        }
    except Exception as e:
        print(f"Connection error: {str(e)}")
        return {"connection": "failed", "error": str(e)}

@app.get("/sdlc_models")
def get_data():
    try:
        # Use table() method - don't mix query() and select()
        response = supabase.table("SDLC_Models").select("*").execute()
        return response.data
    except Exception as e:
        print(f"SDLC_Models error: {str(e)}")
        return {"error": str(e)}

@app.get("/document_types")
def get_data():
    try:
        # Use table() method - don't mix query() and select()
        response = supabase.table("Document_Types").select("*").execute()
        return response.data
    except Exception as e:
        print(f"SDLC_Models error: {str(e)}")
        return {"error": str(e)}

@app.get("/environments")
def get_data():
    try:
        # Use table() method - don't mix query() and select()
        response = supabase.table("Environment").select("*").execute()
        return response.data
    except Exception as e:
        print(f"SDLC_Models error: {str(e)}")
        return {"error": str(e)}

@app.get("/project_tracking_systems")
def get_data():
    try:
        # Use table() method - don't mix query() and select()
        response = supabase.table("Project_Tracking_System").select("*").execute()
        return response.data
    except Exception as e:
        print(f"SDLC_Models error: {str(e)}")
        return {"error": str(e)}

@app.get("/data")
def get_all_records():
    try:
        # Replace 'your_table' with the actual table name in public schema
        response = supabase.table("Project_Tracking_System").select("*").execute()
        print(response)
        return response.data
    except Exception as e:
        return {"error": str(e)}

@app.get("/tables")
def list_all_tables():
    try:
        # Querying PostgreSQL system catalog to get all table names in public schema
        response = supabase.rpc("list_all_tables").execute()
        return response.data
    except Exception as e:
        return {"error": str(e)}


def print_all_tables():
    # Query to get all tables in the public schema
    response = supabase.table("pg_catalog.pg_tables").select("tablename").eq("schemaname", "public").execute()
    
    print("Tables in database:")
    for table in response.data:
        print(f"- {table['tablename']}")
    
    return response.data


def main():
    print("Hello, world! This is the entry point of the application.")
    # Print all tables when the application starts
    tables = print_all_tables()
    print(f"Found {len(tables)} tables")

if __name__ == "__main__":
    main()