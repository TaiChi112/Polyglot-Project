from fastapi import FastAPI

# 1. สร้าง Instance
app = FastAPI()

# 2. สร้าง Route พื้นฐาน
@app.get("/")
def read_root():
    return {"status": "success", "message": "Hello from Python FastAPI!"}

# หมายเหตุ: Uvicorn จะเป็นตัวจัดการรันเซิร์ฟเวอร์จากคำสั่งใน Dockerfile เอง