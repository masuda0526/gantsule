import type React from "react";
import type Task from "../../../interface/Task";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { getDispString, hasProbrem } from "../../../util/StatusUtil";
import { PROGRESS_STATUS, type StatusKey } from "../../../constants/Status";
import { updateTask } from "../../../app/CurrentProjectReducer";
import { useEffect, useState } from "react";

export const TaskStatus: React.FC<{ task: Task }> = ({ task }) => {
  // 編集モード監視
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispatch = useAppDispatch();

  const keys = Object.keys(PROGRESS_STATUS) as StatusKey[];
  const [localStatus, setLocalStatus] = useState<string>(task.status);

  useEffect(()=> {
    setLocalStatus(task.status)
  },[task.status])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalStatus(e.target.value);
  }

  const handleBlur = () => {
    if (localStatus !== task.status) {
      dispatch(updateTask({ task: { ...task, status: localStatus } }));
    }
  }

  return (
    <div className="task-progress">進捗状況：
      {isEdit ?
        (<select
          onChange={handleChange}
          onBlur={handleBlur}
          value={localStatus}>
          {keys.map(key => (
            <option
              key={key}
              value={PROGRESS_STATUS[key].value}>
              {PROGRESS_STATUS[key].display}
            </option>
          ))}
        </select>) :
        (<span className={hasProbrem(localStatus) ? 'has-probrem' : ''}>
          {getDispString(localStatus)}
        </span>)
      }
    </div>
  )

}