from fastapi import FastAPI
from supabase import create_client, Client

app = FastAPI()



supabase_url = "https://hzsxtccacfzmcbcuejyj.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3h0Y2NhY2Z6bWNiY3VlanlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNTEzODUsImV4cCI6MjA2NjkyNzM4NX0.SCDklZUgFmY7cwU3J_9Xx3KEUxbYHazu5Cw7c5nu7rg"
supabase = create_client(supabase_url, supabase_key)


@app.get("/ping")
def ping_supabase():
    if supabase:
        return {"status": "initialized"}
    return {"status": "not initialized"}


@app.get("/database_info")
def get_database_info():
    try:
        # Execute a query to get database name
        response = supabase.rpc("execute_sql", {
            "sql_query": "SELECT current_database() as db_name"
        }).execute()
        
        # If the RPC function doesn't exist, we need a different approach
        if "error" in response:
            # Try with a table query to pg_database instead
            response = supabase.table("pg_database").select("datname").single().execute()
            return {"database": response.data["datname"]}
        
        return {"database": response.data[0]["db_name"]}
    except Exception as e:
        print(f"Database info error: {str(e)}")
        
        # Fallback - in Supabase, the database name is often derived from the project URL
        project_id = supabase_url.split("//")[1].split(".")[0]
        return {
            "error": str(e),
            "database": f"postgres (Project ID: {project_id})"
        }

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

@app.get("/data")
def get_all_records():
    try:
        # Replace 'your_table' with the actual table name in public schema
        response = supabase.table("SDLC_Models").select("*").execute()
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