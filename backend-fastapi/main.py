from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "service": "Python Backend",
        "language": "Python (FastAPI)",
        "status": "Running smart 🐍"
    }