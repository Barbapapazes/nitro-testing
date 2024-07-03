export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");

  return {
    message: `Hello ${name}!`,
  };
});
