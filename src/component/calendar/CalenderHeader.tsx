import type React from "react";
import '../../styles/Calendar.scss'
import type { CalenderCreateSet, day } from "../../util/Calender/CalenderInterface";
import type { Calenderbuilder } from "../../util/Calender/CalenderBuilder";
import { perseWeekDt } from "../../util/WeekDateUtil";


const CalendarHeader: React.FC<{calendarBuilder:Calenderbuilder}> = ({calendarBuilder}) => {
  const yset: CalenderCreateSet[] = calendarBuilder.getYearSet();
  const mset: CalenderCreateSet[] = calendarBuilder.getMonthSet();
  const days:day[] = calendarBuilder.getDaySet();

  return (
    <>

      <tr>
        {yset.map(y => {
          return (<th key={y.val} className="year" colSpan={y.count}>{y.val}年</th>)
        })}
      </tr>
      <tr>
        {mset.map(m => {
          return (<th key={m.val} className="month" colSpan={m.count}>{m.val}月</th>)
        })}
      </tr>
      <tr>
        {days.map( (d, i) => {
          return (<th key={i} className="day">{d.val}</th>)
        })}
      </tr>
      <tr>
        {days.map( (d, i) => {
          return (<th key={i} className="day">{perseWeekDt(d.weekDt)}</th>)
        })}
      </tr>
    </>
  )
}

export default CalendarHeader;