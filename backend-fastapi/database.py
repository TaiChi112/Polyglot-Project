import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. ดึง URL มาก่อน
raw_url = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:my_secure_password@polyglot-db:5432/polyglot_db"
)

# 🚨 2. ทำความสะอาด URL: ตัด ?schema=public ทิ้งไป (ถ้ามี)
DATABASE_URL = raw_url.split("?")[0] 

# 3. สร้าง Engine ด้วย URL ที่สะอาดแล้ว
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()