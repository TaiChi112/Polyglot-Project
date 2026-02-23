package repository

import (
	"backend-fiber/models" // อ้างอิงชื่อตามที่ตั้งใน go mod init
	"gorm.io/gorm"
)

// 1. สร้าง Interface (สัญญา)
type ProductRepository interface {
	GetAllProducts() ([]models.Product, error)
}

// 2. สร้าง Struct สำหรับทำงานจริง
type productRepository struct {
	db *gorm.DB
}

// 3. ฟังก์ชันสำหรับ Inject Database (Dependency Injection)
func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db}
}

// 4. Logic ดึงข้อมูลจาก Database
func (r *productRepository) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	// ใช้ GORM ดึงข้อมูลทั้งหมดและเรียงตาม ID
	result := r.db.Order("id asc").Find(&products)
	return products, result.Error
}