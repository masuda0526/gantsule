import type React from "react";
import type Task from "../../../interface/Task";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { updateTask } from "../../../app/CurrentProjectReducer";

export const TaskManager : React.FC<{task:Task}> = ({task}) => {
  // 編集モード監視
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  // 共通処理
  const dispatch = useAppDispatch();
  // 担当者名の状態監視
  const [localManager, setLocalManager] = useState<string>(task.manager);
  // 担当者名変更で発火
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocalManager(e.target.value);
  }
  // 担当者名のフォーカスが外れたら発火
  const handleBlur = () => {
    if(localManager !== task.manager){
      dispatch(updateTask({task:{...task, manager:localManager}}));
    }
  }
  // Reduxを監視
  useEffect(()=>{
    setLocalManager(task.manager)
  },[task.manager]);

  return(
    <div className="task-manager">担当者：
    {
      isEdit?
        (<input 
          onChange={handleChange}
          onBlur={handleBlur}
          value={localManager}/>):
        localManager
    }
    </div>
  )
}