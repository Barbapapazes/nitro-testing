import { test, expect } from "@playwright/test";

test.describe("POST /api/[name]", () => {
  const body = {
    name: "John",
  };

  test("accepts the user", async ({ request }) => {
    const response = await request.post(`/api`, { data: body });

    expect(response.statusText()).toBe("No Content");
    expect(response.status()).toBe(204);
  });

  test("throws an error if the name is missing", async ({ request }) => {
    const response = await request.post(`/api`, { data: {} });

    expect(response.statusText()).toBe("Bad Request");
    expect(response.status()).toBe(400);
  });
});
