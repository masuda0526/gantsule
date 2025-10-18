import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Subject from "../../interface/Subject";
import { convertToDayList, createClassName } from "../../util/WeekDateUtil";
import CalendarTask from "./CalendarTask";

const CalendarSubject:React.FC<{calObj:CalenderObjectTransfer, sj:Subject}> = ({calObj, sj})=>{

  

  return (
    <>
      <tr>
        <th className="task">{sj.name}</th>
        {convertToDayList(calObj).map(d => {
          return <td key={`${sj.subjectId}-${d.id}`} className={createClassName(d, sj)}></td>
        })}
      </tr>
      {sj.tasks.map(t => {
        return <CalendarTask key={t.taskId} calObj={calObj} task={t}></CalendarTask>
      })}
      
    </>
  )
}

export default CalendarSubject;