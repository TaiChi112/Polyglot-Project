package models

import "time"

// ใช้ Struct ควบคู่กับ JSON Tags และ GORM Tags
type Product struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	Name          string    `gorm:"unique;not null;type:varchar(100)" json:"name"`
	Description   string    `json:"description"`
	Price         float64   `gorm:"type:decimal(10,2)" json:"price"`
	StockQuantity int       `gorm:"default:0" json:"stock_quantity"`
	CreatedAt     time.Time `json:"created_at"`
}