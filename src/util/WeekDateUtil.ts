
const WEEK_DATE_STRING = ['日','月','火', '水', '木', '金', '土']
export const perseWeekDt = (weekNum:number):string => {
  return WEEK_DATE_STRING[weekNum];
}