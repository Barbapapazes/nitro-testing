export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = body.name;

  if (!name) {
    throw createError({
      status: 400,
      message: "Name is required",
    });
  }

  // Create something somewhere

  return sendNoContent(event, 204);
});
