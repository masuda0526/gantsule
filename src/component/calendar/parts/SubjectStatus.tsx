import type React from "react";
import type Subject from "../../../interface/Subject";
import { useAppDispatch } from "../../../app/hook";
import { useEffect } from "react";
import { updateSubject } from "../../../app/CurrentProjectReducer";
import { checkStatusUnderTasks, getDispString } from "../../../util/StatusUtil";

export const SubjectStatus:React.FC<{subject:Subject}> = ({subject})=>{
  const dispacth = useAppDispatch();
  useEffect(()=>{
    const statusItem = checkStatusUnderTasks(subject.tasks);
    dispacth(updateSubject({subject:{...subject, status:statusItem.value}}))
  }, [subject.tasks]);
  return(
    <div>進捗：{getDispString(subject.status)}</div>
  )
}