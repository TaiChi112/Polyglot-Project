# Stage 1: Builder
FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Runner
FROM node:18-alpine
WORKDIR /app
# นำมาเฉพาะไฟล์ที่จำเป็นสำหรับการรัน Production ย่อขนาดจาก GB เหลือหลักร้อย MB
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]