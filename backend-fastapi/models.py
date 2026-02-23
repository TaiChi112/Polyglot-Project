from sqlalchemy import Column, Integer, String, Numeric, DateTime, func
from database import Base

class Product(Base):
    __tablename__ = "products" # บอกให้ตรงกับตารางจริงใน Postgres

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String)
    price = Column(Numeric(10, 2), nullable=False)
    stock_quantity = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())