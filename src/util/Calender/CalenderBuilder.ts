import dayjs, { Dayjs } from "dayjs";
import ja from 'dayjs/locale/ja';
import type { CalenderCreateSet, CalenderObjectTransfer, day, month } from "./CalenderInterface";

dayjs.locale(ja);

export class Calenderbuilder {

  /** デフォルトの表示開始期間 */
  defaultBeforeMonth = 1;

  /** デフォルトの表示終了期間 */
  defaultAfterMonth = 3;

  /** 表示の開始日 */
  startDate: Dayjs

  /** 表示の終了日 */
  endDate: Dayjs
  /** 基準日 */
  baseDate: Dayjs;

  /** カレンダー生成オブジェクト */
  calenderObject: CalenderObjectTransfer;

  /**
   * コンストラクターです。
   * @param baseDt 基準日（デフォルトは今日）
   * @param beforeMonth 遡る日付開始月数（デフォルトは１ヶ月前）
   * @param afterMonth 表示する日付終了月数（デフォルトは３ヶ月先）
   */
  constructor(baseDt: string | null = null, beforeMonth: number | null = null, afterMonth: number | null = null) {
    // 基準日設定
    if (baseDt) {
      this.baseDate = dayjs(baseDt);
    } else {
      this.baseDate = dayjs();
    }
    // 開始日計算
    if (beforeMonth) {
      this.startDate = this.baseDate.subtract(beforeMonth, 'month').startOf('month');
    } else {
      this.startDate = this.baseDate.subtract(this.defaultBeforeMonth, 'month').startOf('month');
    }

    // 終了日計算
    if (afterMonth) {
      this.endDate = this.baseDate.add(afterMonth, 'month').endOf('month');
    } else {
      this.endDate = this.baseDate.add(this.defaultAfterMonth, 'month').endOf('month')
    }

    //  オブジェクト生成
    this.calenderObject = this.getNewCalenderObj();


  }

  getNewCalenderObj(): CalenderObjectTransfer {
    // 表示開始のDayjs
    let tmpDate: Dayjs = this.startDate.clone();

    // 新規オブジェクト生成
    const dto: CalenderObjectTransfer = { years: [] };
    while (true) {
      // 追加もしくは作成
      this.addDateDto(dto, tmpDate);

      // 終了日以降なら処理を終了
      if (tmpDate.isSame(this.endDate, 'day') || tmpDate.isAfter(this.endDate, 'day')) {
        break;
      }

      // 一日増やす
      tmpDate = tmpDate.add(1, 'day').clone();

    }

    return dto;
  }

  addDateDto(obj: CalenderObjectTransfer, dt: Dayjs): void {
    const year = dt.format('YYYY');
    const targetY = obj.years.find(y => y.val === year)
    if (!targetY) {
      obj.years.push({ val: year, months: [this.createMonth(dt)] })
    } else {
      this.checkAndAddMonth(targetY.months, dt);
    }
  }


  checkAndAddMonth(months: month[], dt: Dayjs): void {
    const month = dt.format('M');
    const targetM = months.find(m => m.val === month);
    if (!targetM) {
      months.push({ val: month, days: [this.createDay(dt)] })
    } else {
      this.checkAndAddDay(targetM.days, dt);
    }
  }
  createMonth(dt: Dayjs): month {
    return { val: dt.format('M'), days: [this.createDay(dt)] }
  }

  checkAndAddDay(days: day[], dt: Dayjs): void {
    const day = dt.format('D');
    const targetD = days.find(d => d.val === day);
    if (!targetD) {
      days.push({ val: day, weekDt: dt.day() })
    } else {
      targetD.val = day;
      targetD.weekDt = dt.day();
    }
  }
  createDay(dt: Dayjs): day {
    return { val: dt.format('D'), weekDt: dt.day() }
  }

  getDiffDayCount(): number {
    return this.endDate.endOf('day').diff(this.startDate.endOf('day'), 'day');
  }

  getYearSet(): CalenderCreateSet[] {
    const objs: CalenderCreateSet[] = []
    this.calenderObject.years.forEach(y => {
      let cnt: number = 0
      y.months.forEach(m => {
        cnt += m.days.length
      })
      objs.push({ val: y.val, count: cnt })
    })
    return objs;
  }

  getMonthSet(): CalenderCreateSet[]{
    const objs: CalenderCreateSet [] = [];
    this.calenderObject.years.forEach(y => {
      y.months.forEach(m => {
        objs.push({val:m.val, count:m.days.length})
      })
    })
    return objs;
  }

  getDaySet():day[]{
    const days:day[] = [];
    this.calenderObject.years.forEach(y => {
      y.months.forEach(m => {
        m.days.forEach(d => {
          days.push(d);
        })
      })
    })
    return days;
  }
}