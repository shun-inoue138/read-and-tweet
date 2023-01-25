export const getFormattedDatebyYmd = (originalDate: Date) => {
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const date = originalDate.getDate();
  return month > 10 && date > 10
    ? `${year}-${month}-${date}`
    : month > 10
    ? `${year}-${month}-0${date}`
    : date > 10
    ? `${year}-0${month}-${date}`
    : `${year}-0${month}-0${date}`;
};
