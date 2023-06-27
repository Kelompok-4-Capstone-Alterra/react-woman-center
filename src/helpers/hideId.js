export const hideId = (id, charLength = 15) => {
  return `${id.substring(0, charLength)}...`;
};
