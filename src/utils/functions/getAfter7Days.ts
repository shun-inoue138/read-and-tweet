import { getFormattedDatebyYmd } from "./getFormattedDate";

//todo:configsテーブルからデフォルトの期限を取得して下記関数にわたすようにする。
export const getOneWeekAfterDay = () => {
  const today = new Date();
  const after7Days = new Date(today.setDate(today.getDate() + 7));
  const after7DaysString = getFormattedDatebyYmd(after7Days);
  return after7DaysString;
};
