import { PrismaClient, Product } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
}

export class PrismaProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    // 1. ดึง URL จาก Environment Variable
    const connectionString = process.env.DATABASE_URL;
    
    // 2. สร้าง Connection Pool (บ่อน้ำสำหรับเก็บท่อเชื่อมต่อ)
    const pool = new Pool({ connectionString });
    
    // 3. หุ้มด้วย Prisma Adapter
    const adapter = new PrismaPg(pool);
    
    // 4. ส่ง Adapter เข้าไปให้ PrismaClient (นี่คือสิ่งที่ Prisma 7 บังคับ!)
    this.prisma = new PrismaClient({ adapter });
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        orderBy: { id: 'asc' }
      });
    } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Failed to fetch products");
    }
  }
}