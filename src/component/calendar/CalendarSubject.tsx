import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Subject from "../../interface/Subject";
import CalendarTask from "./CalendarTask";
import { SubjectName } from "./parts/SubjectName";
import { SubjectLeader } from "./parts/SubjectLeader";
import { SubjectStatus } from "./parts/SubjectStatus";
import { CalendarSubjectTdRow } from "./CalendarSubjectTdRow";
import { useAppSelector } from "../../app/hook";
import { AddTaskBtn } from "./AddTaskBtn";

const CalendarSubject: React.FC<{ calObj: CalenderObjectTransfer, sj: Subject }> = ({ calObj, sj }) => {
  const isEdit = useAppSelector(state => state.currentProject.isEdit);

  return (
    <>
      <tr>
        <th className="task">
          <div className="subject-content">
            <SubjectName subject={sj}></SubjectName>
            <SubjectStatus subject={sj}></SubjectStatus>
            <SubjectLeader subject={sj}></SubjectLeader>
          </div>
          {isEdit?(<AddTaskBtn subjectId={sj.subjectId}></AddTaskBtn>):''}
        </th>
        <CalendarSubjectTdRow calObj={calObj} subject={sj}></CalendarSubjectTdRow>
      </tr>
      {sj.tasks.map(t => {
        return <CalendarTask key={t.taskId} calObj={calObj} task={t}></CalendarTask>
      })}
    </>
  )
}

export default CalendarSubject;