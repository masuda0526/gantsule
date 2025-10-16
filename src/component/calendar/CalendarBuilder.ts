import dayjs, { Dayjs } from "dayjs";
import ja from 'dayjs/locale/ja';
import type { CalenderObjectTransfer, day, month, year } from "./CalenderInterface";

dayjs.locale(ja);

export class CalendarBuilder {

  baseDate: Dayjs

  startDate!: Dayjs

  endDate!: Dayjs

  constructor(baseDt: string | null = null, beforeMonth: number = 1, afterMonth: number = 3) {
    // 基準日を設定
    this.baseDate = baseDt?dayjs(baseDt):dayjs();

    // 開始日・終了日を計算
    this.setRange(beforeMonth, afterMonth);
  }

  setRange(beforeMonth: number, afterMonth: number) {
    this.startDate = this.baseDate.clone().subtract(beforeMonth, 'month').startOf('month');
    this.endDate = this.baseDate.clone().add(afterMonth, 'month').endOf('month');
  }

  generate(): CalenderObjectTransfer {
    let tmpDate = this.startDate.clone();
    let obj: CalenderObjectTransfer = { years: [] };

    while (true) {
      const y: string = tmpDate.format('YYYY');
      let yearObj:year|undefined = obj.years.find(yo => yo.val === y);
      if (!yearObj) {
        yearObj = this.createYearObj(tmpDate);
        obj.years.push(yearObj)
      }

      const m:string = tmpDate.format('M');
      let monthObj:month|undefined = yearObj.months.find(mo => mo.val === m);
      if (!monthObj){
        monthObj = this.createMonthObj(tmpDate);
        yearObj.months.push(monthObj)
      }

      const d:string = tmpDate.format('D');
      let dayObj:day|undefined = monthObj.days.find(dayo => dayo.val === d);
      if(!dayObj){
        dayObj = this.createDayObj(tmpDate);
        monthObj.days.push(dayObj);
      }

      if(tmpDate.isSame(this.endDate, 'day') || tmpDate.isAfter(this.endDate, 'day')){
        break;
      }

      tmpDate = tmpDate.add(1, 'day');
    }
    return obj;
  }

  createId(prefix: string, dt: Dayjs): string {
    return `${prefix}${dt.format('YYYYMMDD')}`;
  }

  createYearObj(dt: Dayjs): year {
    return {
      id: this.createId('y', dt),
      val: dt.format('YYYY'),
      months: []
    }
  }

  createMonthObj(dt: Dayjs):month{
    return {
      id:this.createId('m', dt),
      year:dt.format('YYYY'),
      val:dt.format('M'),
      days:[]
    }
  }

  createDayObj(dt:Dayjs):day{
    return {
      id:this.createId('d', dt),
      year:dt.format('YYYY'),
      month:dt.format('M'),
      val:dt.format('D'),
      weekDt:dt.day()
    }
  }
}