export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = body.name;

  if (!name) {
    throw createError({
      status: 400,
      message: "Name is required",
    });
  }

  const db = useDatabase();

  await db.sql`create table if not exists names ("id" integer primary key asc, "name" text)`;

  const existingName = await db.sql`select * from names where name = ${name}`;

  if (existingName.rows.length > 0) {
    throw createError({
      status: 409,
      message: "Name already exists",
    });
  }

  await db.sql`insert into names (name) values (${name})`;

  return sendNoContent(event, 204);
});
