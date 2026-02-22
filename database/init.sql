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

INSERT INTO products (name, description, price, stock_quantity) 
VALUES 
('Mechanical Keyboard', 'Clicky keyboard for developers', 120.50, 50),
('Ergonomic Mouse', 'Save your wrist', 60.00, 100) 
ON CONFLICT (name) DO NOTHING;