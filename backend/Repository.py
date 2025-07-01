rom fastapi import FastAPI
from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client


app = FastAPI()



