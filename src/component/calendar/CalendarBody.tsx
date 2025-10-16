import type React from "react";
import '../../styles/Calendar.scss'
import type { CalenderObjectTransfer } from "./CalenderInterface";
import { convertToDayList, createClassName } from "../../util/WeekDateUtil";
import type Subject from "../../interface/Subject";
import type Task from "../../interface/Task";

const CalendarBody: React.FC<{ calObj: CalenderObjectTransfer, task:Subject|Task }> = ({ calObj, task }) => {

  return (
    <>
      <tr>
        <td>{task.name}</td>
        {convertToDayList(calObj).map(d => {
          return (<td key={d.id} className={`${createClassName(d, task)}`}></td>)
        })}
      </tr>
    </>
  )
}

export default CalendarBody;