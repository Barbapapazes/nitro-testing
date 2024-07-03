import { test, expect } from "@playwright/test";
import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";

test.describe("POST /api/[name]", () => {
  const body = {
    name: "John",
  };

  const db = createDatabase(sqlite({}));

  test.beforeEach(async () => {
    await db.sql`drop table if exists names`;
    await db.sql`create table if not exists names ("id" integer primary key asc, "name" text)`;
  });

  test("saves user in database", async ({ request }) => {
    await request.post(`/api`, { data: body });

    const names = await db.sql`select * from names where name = ${body.name}`;

    expect(names.rows.length).toBe(1);
  });

  test("returns 204 no content", async ({ request }) => {
    const response = await request.post(`/api`, { data: body });

    expect(response.statusText()).toBe("No Content");
    expect(response.status()).toBe(204);
  });

  test("can not save the same user twice", async ({ request }) => {
    await request.post(`/api`, { data: body });

    const response = await request.post(`/api`, { data: body });

    expect(response.statusText()).toBe("Conflict");
    expect(response.status()).toBe(409);
  });

  test("can not save user without name", async ({ request }) => {
    const response = await request.post(`/api`, { data: {} });

    expect(response.statusText()).toBe("Bad Request");
    expect(response.status()).toBe(400);
  });
});
