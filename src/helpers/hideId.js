export const hideId = (id, charLength = 13) => {
  return `${id.substring(0, charLength)}`;
};
