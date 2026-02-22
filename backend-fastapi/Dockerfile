# Stage 1: Builder
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Runner
FROM python:3.11-slim
WORKDIR /app
# ก๊อปปี้เฉพาะไลบรารีที่ลงเสร็จแล้วมา
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 4002
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4002"]