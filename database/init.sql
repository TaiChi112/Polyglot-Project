-- database/init.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 🚨 เพิ่ม UNIQUE ที่ name
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL, 
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert แบบระบุคอลัมน์เป้าหมายตอนเกิด Conflict
INSERT INTO users (username, email, password_hash) 
VALUES ('admin', 'admin@polyglot.local', 'hashed_password_here') 
ON CONFLICT (username) DO NOTHING;

-- Insert ข้อมูลสินค้า 12 รายการ
INSERT INTO products (name, description, price, stock_quantity) 
VALUES 
('Mechanical Keyboard', 'Clicky keyboard for developers', 120.50, 50),
('Ergonomic Mouse', 'Save your wrist', 60.00, 100),
('Ultrawide Monitor', '34-inch curved display for multitasking', 450.00, 20),
('Noise-Cancelling Headphones', 'Block out office noise', 299.99, 35),
('Laptop Stand', 'Adjustable aluminum stand', 35.00, 150),
('USB-C Hub', '7-in-1 multi-port adapter', 45.00, 80),
('Desk Mat', 'Large extended gaming mouse pad', 25.00, 200),
('Webcam 4K', 'High definition camera for meetings', 130.00, 40),
('Studio Microphone', 'USB condenser mic for podcasts', 95.00, 60),
('Ergonomic Chair', 'Lumbar support office chair', 350.00, 15),
('Cable Management Kit', 'Sleeves and ties for a clean desk', 15.50, 300),
('Standing Desk', 'Motorized height adjustable desk', 500.00, 10)
ON CONFLICT (name) DO NOTHING;