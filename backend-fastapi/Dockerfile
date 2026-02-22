# Stage 1: Builder
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# 🚨 เพิ่มบรรทัดนี้: อัปเดตแผนที่ (PATH) ให้ Stage Builder รู้จัก uvicorn
ENV PATH=/root/.local/bin:$PATH

# Stage 2: Runner
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 4002
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4002"]