package main

import (
	"log"
	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"service":  "Go Backend",
			"language": "Go (Fiber)",
			"status":   "Running fast 🚀",
		})
	})

	log.Println("Go Fiber server is running on port 4001")
	log.Fatal(app.Listen(":4001"))
}