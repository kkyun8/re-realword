const request = require("supertest");
const app = require("../../app");

describe("Tag情報取得", () => {
  test("Tag情報取得", async () => {
    const response = await request(app).get("/api/tags");
    expect(response.statusCode).toBe(200);
  });

  test("Tag情報取得 DB exception", async () => {
    const response = await request(app).get("/api/tags");
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors.body).toBeInstanceOf(Array);
  });
});
