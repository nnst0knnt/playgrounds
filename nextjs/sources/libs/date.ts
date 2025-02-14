import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export const format = (date: Date) => {
  return dayjs(date).subtract(9, "hours").format("YYYY-MM-DD(ddd) HH:mm:ss");
};
