import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Task from "../../interface/Task";
import { convertToDayList } from "../../util/WeekDateUtil";
import CalendarTaskTd from "./CalendarTaskTd";
import { TaskName } from "./parts/TaskName";
import { TaskStatus } from "./parts/TaskStatus";
import { TaskManager } from "./parts/TaskManager";

const CalendarTask: React.FC<{ calObj: CalenderObjectTransfer, task: Task }> = ({ calObj, task }) => {
  
  return (
    <>
      <tr>
        <th className="task">
          <div className="task-content">
            <TaskName task={task}></TaskName>
            <TaskStatus task={task}></TaskStatus>
            <TaskManager task={task}></TaskManager>
          </div>
        </th>
        {convertToDayList(calObj).map(d => {
          return (<CalendarTaskTd key={`${task.taskId}-${d.id}`} dayObj={d} task={task}></CalendarTaskTd>)
        })}
      </tr>
    </>
  )
}

export default CalendarTask;