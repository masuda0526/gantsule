import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Task from "../../interface/Task";
import { convertToDayList, createClassName } from "../../util/WeekDateUtil";

const CalendarTask: React.FC<{ calObj: CalenderObjectTransfer, task: Task }> = ({ calObj, task }) => {

  return (
    <>
      <tr>
        <th className="task">{task.name}</th>
        {convertToDayList(calObj).map(d => {
          return (<td className={createClassName(d, task)}></td>)
        })}
      </tr>
    </>
  )
}

export default CalendarTask;