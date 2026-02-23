mod models;
mod repository;

use actix_web::{get, web, App, HttpServer, HttpResponse, Responder};
use actix_cors::Cors;
use sqlx::postgres::PgPoolOptions;
use std::env;
use repository::ProductRepository;

// 1. สร้าง Struct สำหรับเก็บ State (Dependency Injection)
struct AppState {
    db_pool: sqlx::PgPool,
}

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("🦀 Rust Actix is running!")
}

#[get("/api/products")]
async fn get_products(data: web::Data<AppState>) -> impl Responder {
    // 2. เรียกใช้ Repository โดยส่ง Pool เข้าไป
    match ProductRepository::get_all_products(&data.db_pool).await {
        Ok(products) => HttpResponse::Ok().json(products),
        Err(e) => {
            eprintln!("Database Error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({"error": "Internal Server Error"}))
        }
    }
}

// 🚨 จุดเริ่มต้นของโปรแกรม
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // 3. ดึง URL (แก้ไขรหัสผ่านให้ตรงกับของคุณด้วยนะครับ)
    let raw_url = env::var("DATABASE_URL").unwrap_or_else(|_| {
        "postgres://postgres:my_secure_password@postgres-db:5432/polyglot_db".to_string()
    });
    
    // ตัด ?schema=public ทิ้ง (เหมือนที่เราทำใน Python/Go)
    let database_url = raw_url.split('?').next().unwrap_or(&raw_url).to_string();

    // 4. สร้าง Connection Pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create database pool.");

    println!("🦀 Rust Actix server starting on port 4003...");

    HttpServer::new(move || {
        let cors = Cors::permissive(); // 5. เปิด CORS 

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(AppState { db_pool: pool.clone() })) // 🚨 Inject DB เข้าไปใน Actix
            .service(index)
            .service(get_products)
    })
    .bind(("0.0.0.0", 4003))?
    .run()
    .await
}