use sqlx::PgPool;
use crate::models::Product;

pub struct ProductRepository;

impl ProductRepository {
    // ฟังก์ชันนี้รับ Database Pool (บ่อน้ำการเชื่อมต่อ) เข้ามาทำงาน
    pub async fn get_all_products(pool: &PgPool) -> Result<Vec<Product>, sqlx::Error> {
        // ใช้ SQLx ดึงข้อมูลและ Map เข้ากับ Struct Product โดยตรง
        let products = sqlx::query_as::<_, Product>(
            "SELECT id, name, description, price, stock_quantity, created_at FROM products ORDER BY id ASC"
        )
        .fetch_all(pool)
        .await?; // เครื่องหมาย ? คือการจัดการ Error (ถ้าพัง ให้โยน Error ออกไปทันที)

        Ok(products)
    }
}