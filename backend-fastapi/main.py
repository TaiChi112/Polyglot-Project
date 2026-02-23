from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException # 🚨 เพิ่ม HTTPException

from database import SessionLocal
from models import Product

app = FastAPI()

# 🚨 1. ตั้งค่า CORS เพื่อให้ Next.js (Port 3000) ดึงข้อมูลได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚨 2. Dependency: ฟังก์ชันสำหรับแจกจ่าย DB Session และปิดอัตโนมัติเมื่อใช้เสร็จ
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🚨 3. Repository Class (แยก Logic การดึงข้อมูล)
class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_products(self):
        # ใช้ SQLAlchemy ค้นหาข้อมูล (เหมือน prisma.product.findMany)
        return self.db.query(Product).order_by(Product.id.asc()).all()

@app.get("/")
def read_root():
    return {"message": "🐍 FastAPI is running!"}

@app.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    try:
        repo = ProductRepository(db)
        products = repo.get_all_products()
        return products
    except Exception as e:
        print(f"Database Error: {e}")
        # 🚨 โยน Error 500 กลับไปให้หน้าบ้านรู้ตัว
        raise HTTPException(status_code=500, detail="Internal Server Error")