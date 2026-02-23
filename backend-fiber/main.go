package main

import (
	"log"
	"backend-fiber/database"
	"backend-fiber/repository"

	// 🚨 1. เปลี่ยน Import เป็น v3 ทั้งหมด
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	database.Connect()
	productRepo := repository.NewProductRepository(database.DB)

	app := fiber.New()

	// 🚨 2. ตั้งค่า CORS สำหรับ Fiber v3 โดยเฉพาะ (ใช้ Slice []string)
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"Origin, Content-Type, Accept"},
		AllowMethods: []string{"GET", "POST", "HEAD", "PUT", "DELETE", "PATCH"},
	}))

	// 🚨 3. สังเกตว่า c fiber.Ctx จะไม่มีเครื่องหมาย * (ดอกจัน) แล้ว
	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("🐹 Go Fiber v3 is running!")
	})

	app.Get("/api/products", func(c fiber.Ctx) error {
		products, err := productRepo.GetAllProducts()
		if err != nil {
			log.Println("Database Error:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
		}
		return c.JSON(products)
	})

	log.Fatal(app.Listen(":4001"))
}