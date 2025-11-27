import type React from "react";
import type { day } from "./CalenderInterface";
import type Subject from "../../interface/Subject";
import { createClassName } from "../../util/WeekDateUtil";

export const CalendarSubjectTd: React.FC<{ dayObj: day, subject: Subject }> = ({ dayObj, subject }) => {
  return (
    <td className={createClassName(dayObj, subject)}></td>
  )
}