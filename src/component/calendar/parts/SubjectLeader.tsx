import type React from "react";
import type Subject from "../../../interface/Subject";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useState } from "react";
import { updateSubject } from "../../../app/CurrentProjectReducer";

export const SubjectLeader : React.FC<{subject:Subject}> = ({subject}) => {
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispatch = useAppDispatch();
  const [localLeader, setlocalLeader] = useState<string>(subject.leader);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setlocalLeader(e.target.value);
  }
  const handleBlur = () => {
    if(localLeader !== subject.leader){
      dispatch(updateSubject({subject:{...subject, leader:localLeader}}));
    }
  }

  return (
    <div className="sj-leader">
      リーダー：
      {isEdit?(
        <input type="text" onChange={handleChange} onBlur={handleBlur} value={localLeader}/>
      ):localLeader}
    </div>
  )
}