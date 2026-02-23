use rust_decimal::Decimal;
// 🚨 1. เปลี่ยนจาก NaiveDateTime เป็น DateTime และ Utc
use chrono::{DateTime, Utc}; 
use serde::Serialize;
use sqlx::FromRow;

#[derive(Serialize, FromRow)]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub price: Decimal,
    pub stock_quantity: Option<i32>,
    // 🚨 2. เปลี่ยน Type ให้รองรับ Timezone (TIMESTAMPTZ)
    pub created_at: Option<DateTime<Utc>>, 
}