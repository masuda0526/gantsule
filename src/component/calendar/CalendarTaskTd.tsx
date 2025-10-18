import type React from "react";
import { useEffect, useState } from "react";
import { useCalendar } from "./CalendarContext";
import type { day } from "./CalenderInterface";
import type Task from "../../interface/Task";
import { createClassName } from "../../util/WeekDateUtil";
import dayjs from "dayjs";

const CalendarTaskTd: React.FC<{ dayObj: day, task: Task }> = ({ dayObj, task }) => {
  const { taskId, setTaskId, startDt, endDt, resetAll, setSpan } = useCalendar();

  const [isSelect, setSelectFlg] = useState<boolean>(false);

  const handleDown = (dayObj: day, task: Task) => {
    setTaskId(task.taskId);
    setSpan(dayObj.str);
  }

  const handleEnter = (dayObj: day) => {
    setSpan(dayObj.str);
  }

  const handleUp = () => {
    console.log('Drog Up');
    resetAll();
  }

  const inSpan = ():boolean => {
    const dt = dayjs(dayObj.str);

    // 開始日よりあと、または、終了日より前
    if(dt.isBefore(endDt) && dt.isAfter(startDt)){
      return true;
    }

    // 開始日か終了日と同じ
    if(dt.isSame(startDt, 'day') || dt.isSame(endDt, 'day')){
      return true;
    }

    return false;
  }

  // パラメータを監視してセレクト状態を切り替える
  useEffect(() => {

    if(taskId === ''){
      setSelectFlg(false);
      return;
    }

    // 同じタスクかつ選択期間内
    if (task.taskId === taskId && inSpan()){
      setSelectFlg(true);
    }

  }, [taskId, startDt, endDt])

  // クラス名を生成
  const getClassName = ():string => {
    const gcn = isSelect?'select-now':'';
    return `${createClassName(dayObj, task)} ${gcn}`;
  }

  return (
    <td
      key={`${task.taskId}-${dayObj.id}`}
      className={getClassName()}
      onMouseDown={() => handleDown(dayObj, task)}
      onMouseEnter={() => handleEnter(dayObj)}
      onMouseUp={() => handleUp()}
    ></td>
  )
}

export default CalendarTaskTd;