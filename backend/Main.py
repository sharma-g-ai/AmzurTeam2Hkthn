from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def read_hello():
    return {"message": "Hello, FastAPI!"}

def main():
    print("Hello, world! This is the entry point of the application.")

if __name__ == "__main__":
    main()