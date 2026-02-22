package main

import (
	"log"

	"github.com/gofiber/fiber/v3" // เปลี่ยนเป็น v3
)

func main() {
	app := fiber.New()

	// 🚨 สังเกตตรงนี้: เอาเครื่องหมาย * ออก เหลือแค่ c fiber.Ctx
	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Hello from Go Fiber v3!",
		})
	})

	log.Println("Go Fiber server is running on port 4001")
	log.Fatal(app.Listen(":4001"))
}