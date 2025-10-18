import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Task from "../../interface/Task";
import { convertToDayList } from "../../util/WeekDateUtil";
import CalendarTaskTd from "./CalendarTaskTd";
import { getDispString, hasProbrem } from "../../util/StatusUtil";

const CalendarTask: React.FC<{ calObj: CalenderObjectTransfer, task: Task }> = ({ calObj, task }) => {



  return (
    <>
      <tr>
        <th className="task">
          <div className="task-content">
            <div className="task-name">{task.name}</div>
            <div className="task-progress">進捗状況：<span className={hasProbrem(task.status)?'has-probrem':''}>{getDispString(task.status)}</span></div>
            <div className="task-manager">担当者：{task.manager}</div>
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