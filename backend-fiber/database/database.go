package database

import (
	"log"
	"os"
	"strings"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ตัวแปร Global สำหรับเก็บ Database Session
var DB *gorm.DB

func Connect() {
	rawURL := os.Getenv("DATABASE_URL")
	if rawURL == "" {
		rawURL = "postgresql://postgres:my_secure_password@postgres-db:5432/polyglot_db"
	}

	// 🚨 ตัด ?schema=public ทิ้งเพื่อป้องกัน Error แบบเดียวกับ Python
	cleanDSN := strings.Split(rawURL, "?")[0]

	db, err := gorm.Open(postgres.Open(cleanDSN), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
	}

	log.Println("Database connected successfully")
	DB = db
}