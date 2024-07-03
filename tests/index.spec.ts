import { expect, test } from "@playwright/test";

test.describe("/", () => {
  test("responds with a 200", async ({ request }) => {
    const response = await request.get("/");

    expect(response.status()).toBe(200);
  });

  test("responds with a json", async ({ request }) => {
    const response = await request.get("/");

    expect(response.headers()["content-type"]).toBe("application/json");
  });

  test("has a message key", async ({ request }) => {
    const response = await request.get("/");

    const body = await response.json();

    expect(body).toHaveProperty("message");
  });

  test("has a message value", async ({ request }) => {
    const response = await request.get("/");

    const body = await response.json();

    expect(body.message).toBe("Hello from the route!");
  });
});
