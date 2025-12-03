import type React from "react";
import { ModalBase } from "./ModalBase";
import { TextInput } from "../Form/TextInput";
import { useState } from "react";
import { ButtonArea } from "../Form/ButtonArea";
import { Button } from "../Form/Button";
import type Subject from "../../interface/Subject";
import { createNewSubjectId } from "../../util/ProjectUtil";
import { PROGRESS_STATUS } from "../../constants/Status";
import { useAppDispatch } from "../../app/hook";
import { addSubject } from "../../app/CurrentProjectReducer";
import { hide } from "../../app/ModalReducer";
import { ValidationContext } from "../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../util/validation/ValidationBuilder";

export const AddSubjectModal : React.FC = () => {
  const dispacth = useAppDispatch()
  const [subjectName, setSubjectName] = useState<string>('');
  const [leaderName, setLeaderName] = useState<string>('');
  const handleChangeSjName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  }
  const handleChangeLeaderNm = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLeaderName(e.target.value);
  }

  // バリデーション構築
  const vc = new ValidationContext();
  vc.add(new ValidationBuilder('subjectName', subjectName, '課題名').require().txtmax(30));
  vc.add(new ValidationBuilder('leader', leaderName, 'リーダー名').require().txtmax(30));

  const handleClick = () => {
    vc.validate(false);
    if(vc.isError()){
      alert(vc.getErrorMsgsForAlert());
      return 
    }
    const newSubject:Subject = {
      subjectId:createNewSubjectId(),
      name:subjectName,
      startDt:'',
      endDt:'',
      status:PROGRESS_STATUS.NO_START.value,
      leader:leaderName,
      tasks:[]
    }
    dispacth(addSubject({subject:newSubject}));
    dispacth(hide());
  }
  return (
    <ModalBase title="課題を追加する">
      <div>
        <TextInput title="課題名" value={subjectName} field="subjectName" onChange={handleChangeSjName} option={{validRules:'require|txtmax:30'}}></TextInput>
        <TextInput title="リーダー名" value={leaderName} field="leader" onChange={handleChangeLeaderNm} option={{validRules:'require|txtmax:30'}}></TextInput> 
        <ButtonArea option={{position:'right'}}>
          <Button label="追加する" onClick={handleClick}></Button>
        </ButtonArea>
      </div>
    </ModalBase>
  )
}