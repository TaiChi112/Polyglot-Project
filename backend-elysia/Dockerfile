# Stage 1: Builder & Runner
FROM oven/bun:alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY . .
EXPOSE 4000
CMD ["bun", "run", "src/index.ts"]