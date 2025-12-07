import type React from "react";
import type Subject from "../../../interface/Subject";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useState } from "react";
import { updateSubject } from "../../../app/CurrentProjectReducer";
import { ValidationContext } from "../../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../../util/validation/ValidationBuilder";

export const SubjectName:React.FC<{subject:Subject}> = ({subject}) => {
  // redux
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispach = useAppDispatch();

  // 状態管理
  const [localName, setLocalName] = useState<string>(subject.name);

  // バリデーション構築
  const vc = new ValidationContext();
  vc.add(new ValidationBuilder('subjectName', localName, '課題名').require().txtmax(30));

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  }

  const handleBlur = () => {
    if(subject.name !== localName){
      vc.validate(false)
      if(vc.isError()){
        alert(vc.getErrorMsgsForAlert());
        setLocalName(subject.name);
        return;
      }
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