import type React from "react";
import { ModalBase } from "./ModalBase";
import { tmpStore } from "../../util/TempValueStore";
import { TextInput } from "../Form/TextInput";
import { useState } from "react";
import { ButtonArea } from "../Form/ButtonArea";
import { Button } from "../Form/Button";
import { useAppDispatch } from "../../app/hook";
import { hide, startLoading } from "../../app/ModalReducer";
import type Task from "../../interface/Task";
import { PROGRESS_STATUS } from "../../constants/Status";
import { createNewSubjectId } from "../../util/ProjectUtil";
import { addTask } from "../../app/CurrentProjectReducer";
import { ValidationContext } from "../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../util/validation/ValidationBuilder";

export const AddTaskModal:React.FC = () => {
  // Reduxから取得
  const dispacth = useAppDispatch();
  // 状態管理
  const [taskName, setTaskName] = useState<string>('');
  const [managerName, setManagerName] = useState<string>('');

  // バリデーション構築
  const vc = new ValidationContext();
  vc.add(new ValidationBuilder('taskName', taskName, 'タスク名').require().txtmax(30));
  vc.add(new ValidationBuilder('maneger', managerName, '担当者名').require().txtmax(30));

  // 追加ボタン
  const handleClick = () => {
    vc.validate(false);
    if(vc.isError()){
      alert(vc.getErrorMsgsForAlert());
      return;
    }

    const subjectId = tmpStore.get('subjectId');
    const task:Task = {
      subjectId:subjectId,
      name:taskName,
      manager:managerName,
      startDt:'',
      endDt:'',
      status:PROGRESS_STATUS.NO_START.value,
      taskId:createNewSubjectId()
    }
    dispacth(addTask({task}));
    dispacth(startLoading())
    dispacth(hide())
  }

  const handleChangeTaskName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }
  const handleChangeManagerName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setManagerName(e.target.value);
  }

  return (
    <ModalBase title="タスクを追加する">

      <TextInput 
        title="タスク名" 
        value={taskName} 
        field="taskName" 
        onChange={handleChangeTaskName} 
        option={{validRules:'require|txtmax:30'}}
      ></TextInput>
      
      <TextInput 
        title="担当者名" 
        value={managerName} 
        field="maneger" 
        onChange={handleChangeManagerName} 
        option={{validRules:'require|txtmax:30'}}
      ></TextInput>
      
      <ButtonArea option={{position:'center'}}>
        <Button label="追加する" onClick={handleClick} ></Button>
      </ButtonArea>

    </ModalBase>
  )
}