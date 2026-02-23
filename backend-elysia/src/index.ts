// src/index.ts
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { PrismaProductRepository } from "./repository/product.repository";

// Inject Repository
const productRepo = new PrismaProductRepository();

const app = new Elysia()
  // 🚨 1. ใช้ Official CORS Plugin จัดการ Preflight ให้ถูกต้อง 100%
  .use(cors()) 
  
  .get("/", () => "🦊 Elysia is running!")
  
  .get("/api/products", async ({ set }) => {
    try {
      const products = await productRepo.getAllProducts();
      return products;
    } catch (error) {
      console.error("Fetch Error:", error);
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  })
  // 🚨 2. บังคับผูก Host 0.0.0.0 เพื่อให้ทะลุ Container ออกมาได้
  .listen({ port: 4000, hostname: "0.0.0.0" }); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);