const convertDateFromString = (date, type) => {
  date = new Date(date);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let formattedDate = '';
  if (type === 'less') {
    formattedDate = `${month}/${year}`;
  } else if (type === 'full') {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  } else formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
export default convertDateFromString;
