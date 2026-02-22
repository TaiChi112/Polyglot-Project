# Stage 1: Builder (ดึง Go เวอร์ชันล่าสุดที่มี Alpine OS ซึ่งมี /bin/sh แน่นอน)
FROM golang:alpine AS builder
WORKDIR /app

# ก๊อปปี้ไฟล์ go.mod และ go.sum เข้าไปก่อน
COPY go.mod go.sum ./

# ดาวน์โหลด Dependencies
RUN go mod download

# ก๊อปปี้ Source Code ทั้งหมด
COPY . .

# คอมไพล์ให้เป็น Static Binary ตัวเดียว
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Runner (ใช้ Scratch เฉพาะตอนนำไปรัน เพื่อให้ Image เล็กที่สุด)
FROM scratch
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 4001
CMD ["./main"]