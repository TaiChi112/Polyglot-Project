# Stage 1: Builder
FROM rust:alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev # จำเป็นสำหรับการคอมไพล์บน Alpine
COPY Cargo.toml Cargo.lock ./
COPY src src
RUN cargo build --release

# Stage 2: Runner
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/target/release/backend-actix .
EXPOSE 4003
CMD ["./backend-actix"]