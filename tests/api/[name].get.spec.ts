import { test, expect } from "@playwright/test";

test.describe("GET /api/[name]", () => {
  const name = "John";

  test("responds with a 200", async ({ request }) => {
    const response = await request.get(`/api/${name}`);

    expect(response.status()).toBe(200);
  });

  test("responds with a json", async ({ request }) => {
    const response = await request.get(`/api/${name}`);

    expect(response.headers()["content-type"]).toBe("application/json");
  });

  test("has a message key", async ({ request }) => {
    const response = await request.get(`/api/${name}`);

    const body = await response.json();

    expect(body).toHaveProperty("message");
  });

  test("has a message value", async ({ request }) => {
    const response = await request.get(`/api/${name}`);

    const body = await response.json();

    expect(body.message).toBe(`Hello ${name}!`);
  });
});
