import type React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useEffect, useState } from "react";
import type Task from "../../../interface/Task";
import { updateTask } from "../../../app/CurrentProjectReducer";
import { ValidationContext } from "../../../util/validation/ValidationContext";
import { ValidationBuilder } from "../../../util/validation/ValidationBuilder";

export const TaskName: React.FC<{ task:Task }> = ({ task }) => {
  // Reduxから共通処理及び変数取得
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  
  // 状態管理
  const [localTaskName, setLocalTaskName] = useState<string>(task.name);
  
  // バリデーション構築
  const vc = new ValidationContext();
  vc.add(new ValidationBuilder('taskName', localTaskName, 'タスク名').require().txtmax(30));

  // 変更で発火
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTaskName(e.target.value);
  }
  // フォーカスを外れたら発火
  const offForcus = () => {
    if (task.name !== localTaskName) {
      vc.validate(false);
      if(vc.isError()){
        alert(vc.getErrorMsgsForAlert());
        setLocalTaskName(task.name) // 初期値へ戻す
        return;
      }
      dispatch(updateTask({ task: { ...task, name: localTaskName } }));
    }
  }

  useEffect(()=>{
    setLocalTaskName(task.name)
  }, [task.name])

  return (
    <div className="task-name">
      {isEdit?(
        <input 
          onChange={handleChange} 
          onBlur={offForcus} 
          value={localTaskName}
        />)
      :task.name}</div>
  )
}