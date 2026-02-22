# แก้ไขจาก golang:1.21-alpine เป็น golang:1.25-alpine หรือ golang:alpine (เพื่อดึงตัวล่าสุดเสมอ)
FROM golang:1.25-alpine AS builder  

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM scratch
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 4001
CMD ["./main"]