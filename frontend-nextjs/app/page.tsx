"use client";

import { useState } from "react";

// กำหนด Type ให้ตรงกับตาราง products ใน Database
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  // ฟังก์ชันยิง API ไปยัง Backend ที่เลือก
  const fetchProducts = async (url: string, backendName: string) => {
    setLoading(true);
    setError(null);
    setSource(backendName);
    
    try {
      // ดึงข้อมูลจากเส้น /api/products ของแต่ละ Backend
      const response = await fetch(`${url}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>📦 Polyglot Products Dashboard</h1>
      <p>เลือก Backend ที่ต้องการให้ไปดึงข้อมูลจาก PostgreSQL:</p>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => fetchProducts("http://localhost:4000", "🦊 Elysia (TypeScript)")}>Elysia (4000)</button>
        <button onClick={() => fetchProducts("http://localhost:4001", "🐹 Go Fiber")}>Fiber (4001)</button>
        <button onClick={() => fetchProducts("http://localhost:4002", "🐍 FastAPI (Python)")}>FastAPI (4002)</button>
        <button onClick={() => fetchProducts("http://localhost:4003", "🦀 Actix (Rust)")}>Actix (4003)</button>
      </div>

      {loading && <p>กำลังโหลดข้อมูล...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && products.length > 0 && (
        <div>
          <h3>ข้อมูลจาก: {source}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ชื่อสินค้า</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ราคา</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>คงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.id}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>${product.price}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.stock_quantity} ชิ้น</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}