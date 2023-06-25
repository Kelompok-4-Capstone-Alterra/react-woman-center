export const convertTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
