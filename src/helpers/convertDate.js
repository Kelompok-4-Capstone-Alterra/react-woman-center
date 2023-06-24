export const convertDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since it is zero-based
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
