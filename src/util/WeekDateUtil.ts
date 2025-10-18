import dayjs from "dayjs";
import type { CalenderObjectTransfer, day, month, year } from "../component/calendar/CalenderInterface";
import type Subject from "../interface/Subject";
import type Task from "../interface/Task";

/** 日付チャートに付与するデフォルトのクラス名 */
const DEFAULT_DAY_CLASS = 'day';

/** 曜日配列 */
const WEEK_DATE_STRING = ['日','月','火', '水', '木', '金', '土']

/**
 * 曜日を表す数字から漢字の曜日へ変換します
 * @param weekNum 曜日を表す数字
 * @returns 漢字１文字の曜日
 */
export const perseWeekDt = (weekNum:number):string => {
  return WEEK_DATE_STRING[weekNum];
}

/**
 * クラス名を生成します。ヘッダーに付与する場合は@method createClassNameOfHeader を使用してください。
 * @param dayObj dayオブジェクト
 * @param obj タスクまたは課題オブジェクト
 * @returns クラス名
 */
export const createClassName = (dayObj:day, obj:Task|Subject):string => {
  const addClasses:string[] = [DEFAULT_DAY_CLASS];
  const dt = dayjs(`${dayObj.year}-${dayObj.month}-${dayObj.val}`)
  grantDayClass(addClasses, dayObj);

  const dtUnix = dt.unix();
  const sdt = dayjs(obj.startDt).unix();
  const edt = dayjs(obj.endDt).unix();
  if(sdt <= dtUnix && dtUnix <= edt){
    addClasses.push('is-progress');
  }
  
  return addClasses.join(' ');
}

/**
 * ヘッダ用のクラス名生成メソッドです
 * @param dayObj 
 * @returns クラス名
 */
export const createClassNameOfHeader = (dayObj:day) => {
  const addClasses:string[] = [DEFAULT_DAY_CLASS];  
  grantDayClass(addClasses, dayObj)
  return addClasses.join(' ');
}

const grantDayClass = (classes:string[], dayObj:day):void => {
  const dt = dayjs(`${dayObj.year}-${dayObj.month}-${dayObj.val}`)
  const today = dayjs();
  if(today.isSame(dt, 'day')){
    classes.push('today');
  }else{
    if(dayObj.weekDt===0){
      classes.push('sun');
    }
    if(dayObj.weekDt===6){
      classes.push('sat')
    }
  }
}

export const convertToDayList = (calObj:CalenderObjectTransfer):day[]=>{
  const l:day[] = [];
  calObj.years.forEach(y => {
    y.months.forEach(m => {
      m.days.forEach(d => {
        l.push(d);
      })
    })
  })
  return l;
}

export const convertToMonthList = (calObj:CalenderObjectTransfer):month[]=>{
  const l : month[] = [];
  calObj.years.forEach(y=>{
    y.months.forEach(m=>{
      l.push(m);
    })
  })
  return l;
}

export const calcDaysCountY = (yearObj:year):number =>{
  let num = 0;
  yearObj.months.forEach(m => {
    num += m.days.length
  })
  return num;
}
