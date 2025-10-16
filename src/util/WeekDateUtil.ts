import dayjs from "dayjs";
import type { CalenderObjectTransfer, day, month, year } from "../component/calendar/CalenderInterface";
import type Subject from "../interface/Subject";
import type Task from "../interface/Task";

const DEFAULT_DAY_CLASS = 'day';
const WEEK_DATE_STRING = ['日','月','火', '水', '木', '金', '土']
export const perseWeekDt = (weekNum:number):string => {
  return WEEK_DATE_STRING[weekNum];
}

export const createClassName = (dayObj:day, obj:Task|Subject):string => {
  const addClasses:string[] = [DEFAULT_DAY_CLASS];
  if(dayObj.weekDt===0){
    addClasses.push('sun');
  }
  if(dayObj.weekDt===6){
    addClasses.push('sat')
  }

  const dt = dayjs(`${dayObj.year}-${dayObj.month}-${dayObj.val}`).unix()
  const sdt = dayjs(obj.startDt).unix();
  const edt = dayjs(obj.endDt).unix();
  if(sdt <= dt && dt <= edt){
    addClasses.push('is-progress');
  }
  
  return addClasses.join(' ');
}

export const createClassNameOfHeader = (dayObj:day) => {
  const addClasses:string[] = [DEFAULT_DAY_CLASS];
  if(dayObj.weekDt===0){
    addClasses.push('sun');
  }
  if(dayObj.weekDt===6){
    addClasses.push('sat')
  }
  return addClasses.join(' ');
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
