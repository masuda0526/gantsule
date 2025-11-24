import type React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useEffect, useState } from "react";
import type Task from "../../../interface/Task";
import { updateTask } from "../../../app/CurrentProjectReducer";

export const TaskName: React.FC<{ task:Task }> = ({ task }) => {
  // Reduxから共通処理及び変数取得
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(state => state.currentProject.isEdit);

  // 状態管理
  const [localTaskName, setLocalTaskName] = useState<string>(task.name);

  // 変更で発火
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTaskName(e.target.value);
  }
  // フォーカスを外れたら発火
  const offForcus = () => {
    if (task.name !== localTaskName) {
      console.log('Out forcus')
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