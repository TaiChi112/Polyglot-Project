"use client"; // บังคับให้เป็น Client Component เพื่อใช้ onClick และ State

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>("Click a button to fetch data!");

  // ฟังก์ชันดึงข้อมูลจาก API (เชื่อมโยงกับ Language-Agnostic Communication)
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(JSON.stringify(result, null, 2));
    } catch (error) {
      setData(`Error fetching data from ${url}`);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Polyglot Microservices Dashboard</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {/* สังเกตว่าเรายิงไปที่ localhost เพราะ Browser ของเราอยู่ข้างนอก Docker */}
        <button onClick={() => fetchData("http://localhost:4000/")}>Get Elysia</button>
        <button onClick={() => fetchData("http://localhost:4001/")}>Get Go</button>
        <button onClick={() => fetchData("http://localhost:4002/")}>Get Python</button>
        <button onClick={() => fetchData("http://localhost:4003/")}>Get Rust</button>
      </div>

      <pre style={{ background: "#eee", padding: "20px", borderRadius: "8px" }}>
        {data}
      </pre>
    </div>
  );
}