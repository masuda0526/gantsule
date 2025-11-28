import type React from "react";
import type Subject from "../../../interface/Subject";
import { getDispString } from "../../../util/StatusUtil";

export const SubjectStatus:React.FC<{subject:Subject}> = ({subject})=>{
  return(
    <div>進捗：{getDispString(subject.status)}</div>
  )
}