use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use serde_json::json;

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "service": "Rust Backend",
        "language": "Rust (Actix)",
        "status": "Running safe 🦀"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Rust Actix server is running on port 4003");
    HttpServer::new(|| {
        App::new().service(index)
    })
    .bind(("0.0.0.0", 4003))?
    .run()
    .await
}