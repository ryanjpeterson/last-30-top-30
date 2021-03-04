export const formatDateAdded = (dateAdded) => {
  const date = new Date(dateAdded);
  return `${date.getMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`;
};
