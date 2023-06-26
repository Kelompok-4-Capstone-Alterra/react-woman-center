export const convertDate = (
  dateString,
  separator = "-",
  dateDisplay = false
) => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${
    dateDisplay ? day : year
  }${separator}${month}${separator}${dateDisplay ? year : day}`;

  return formattedDate;
};
