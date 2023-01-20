//todo:configsテーブルからデフォルトの期限を取得して下記関数にわたすようにする。
export const getAfter7Days = () => {
  const today = new Date();
  const after7Days = new Date(today.setDate(today.getDate() + 7));
  const year = after7Days.getFullYear();
  const month = after7Days.getMonth() + 1;
  const date = after7Days.getDate();
  const after7DaysString =
    month > 10 && date > 10
      ? `${year}-${month}-${date}`
      : month > 10
      ? `${year}-${month}-0${date}`
      : date > 10
      ? `${year}-0${month}-${date}`
      : `${year}-0${month}-0${date}`;
  return after7DaysString;
};
