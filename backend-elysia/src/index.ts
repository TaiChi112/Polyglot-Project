import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => {
    return {
      service: "Elysia API Gateway",
      language: "TypeScript",
      status: "Running smoothly 🦊"
    };
  })
  .listen(4000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);