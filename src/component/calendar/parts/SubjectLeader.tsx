import type React from "react";
import type Subject from "../../../interface/Subject";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useState } from "react";
import { updateSubject } from "../../../app/CurrentProjectReducer";
import { ValidationContext } from "../../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../../util/validation/ValidationBuilder";

export const SubjectLeader : React.FC<{subject:Subject}> = ({subject}) => {
  // redux
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispatch = useAppDispatch();

  // 状態管理
  const [localLeader, setlocalLeader] = useState<string>(subject.leader);

  // バリデーション構築
  const vc = new ValidationContext();
  vc.add(new ValidationBuilder('leader', localLeader, 'リーダー名').require().txtmax(30));

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setlocalLeader(e.target.value);
  }

  const handleBlur = () => {
    if(localLeader !== subject.leader){
      vc.validate(false);
      if(vc.isError()){
        alert(vc.getErrorMsgsForAlert());
        setlocalLeader(subject.leader);
        return;
      }
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