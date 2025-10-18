import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Task from "../../interface/Task";
import { convertToDayList } from "../../util/WeekDateUtil";
import CalendarTaskTd from "./CalendarTaskTd";

const CalendarTask: React.FC<{ calObj: CalenderObjectTransfer, task: Task }> = ({ calObj, task }) => {

  return (
    <>
      <tr>
        <th className="task">{task.name}</th>
        {convertToDayList(calObj).map(d => {
          return (<CalendarTaskTd dayObj={d} task={task}></CalendarTaskTd>)
        })}
      </tr>
    </>
  )
}

export default CalendarTask;