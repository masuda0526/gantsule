import type React from "react";
import type Subject from "../../../interface/Subject";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useState } from "react";
import { updateSubject } from "../../../app/CurrentProjectReducer";

export const SubjectName:React.FC<{subject:Subject}> = ({subject}) => {
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispach = useAppDispatch();
  const [localName, setLocalName] = useState<string>(subject.name);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  }
  const handleBlur = () => {
    if(subject.name !== localName){
      dispach(updateSubject({subject:{...subject, name:localName}}))
    }
  }
  return (
    <div className="sj-name">
      {isEdit?(
        <input type="text" onChange={handleChange} onBlur={handleBlur} value={localName}/>
      ):localName}
    </div>
  )
}