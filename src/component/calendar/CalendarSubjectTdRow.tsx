import type React from "react";
import type Subject from "../../interface/Subject";
import { convertToDayList } from "../../util/WeekDateUtil";
import { CalendarSubjectTd } from "./CalendarSubjectTd";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import type Task from "../../interface/Task";
import dayjs from "dayjs";
import { useAppDispatch } from "../../app/hook";
import { useEffect } from "react";
import { updateSubject } from "../../app/CurrentProjectReducer";

export const CalendarSubjectTdRow : React.FC<{calObj:CalenderObjectTransfer, subject:Subject}> = ({calObj, subject}) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const dates = getBufferFromTask(subject.tasks);
    dispatch(updateSubject({subject:{...subject, startDt:dates[0], endDt:dates[1]}}))
  }, [subject.tasks])

  return (
    convertToDayList(calObj).map(d => {
      return <CalendarSubjectTd key={`${subject.subjectId}-${d.id}`} dayObj={d} subject={subject}></CalendarSubjectTd>
    })
  )
}


const getBufferFromTask = (tasks:Task[]) => {
  let min = '';
  let max = ''; 
  tasks.forEach(task => {
    const sdt = dayjs(task.startDt);
    const edt = dayjs(task.endDt);
    
    if (!min || sdt.isBefore(min)) {
      min = task.startDt;
    }

    if (!max || edt.isAfter(max)) {
      max = task.endDt;
    }
  })
  return [min, max]
}