import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import { calcDaysCountY, convertToDayList, convertToMonthList, createClassNameOfHeader, perseWeekDt } from "../../util/WeekDateUtil";
import { AddSubjectBtn } from "./AddSubjectBtn";

const CalendarHeader: React.FC<{ calObj: CalenderObjectTransfer }> = ({ calObj }) => {

  return (
    <>
      <tr>
        <th rowSpan={4} className="task">タスク名
          <AddSubjectBtn></AddSubjectBtn>
        </th>
        {calObj.years.map(y => {
          return (<th key={y.id} className="year" colSpan={calcDaysCountY(y)}>{y.val}年</th>)
        })}
      </tr>
      <tr>
        {convertToMonthList(calObj).map(m => {
          return (<th key={m.id} className="month" colSpan={m.days.length}>{m.val}月</th>)
        })}
      </tr>
      <tr>
        {convertToDayList(calObj).map(d => {
          return (<th key={d.id} className={createClassNameOfHeader(d)}>{d.val}</th>)
        })}
      </tr>
      <tr>
        {convertToDayList(calObj).map(d => {
          return (<th key={`${d.id}${d.weekDt}`} className={createClassNameOfHeader(d)}>{perseWeekDt(d.weekDt)}</th>)
        })}
      </tr>
    </>
  )

}

export default CalendarHeader;