import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import { calcDaysCountY, convertToDayList, convertToMonthList, createClassNameOfHeader, perseWeekDt } from "../../util/WeekDateUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toggleEditMode, updateSubject } from "../../app/CurrentProjectReducer";
import { checkStatusUnderTasks } from "../../util/StatusUtil";
import { AddSubjectBtn } from "./AddSubjectBtn";

const CalendarHeader: React.FC<{ calObj: CalenderObjectTransfer }> = ({ calObj }) => {
  const dispatch = useAppDispatch()
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const subjects = useAppSelector(state => state.currentProject.currentProject.subjects);
  
  const handleClickToggle = () => {
    if(isEdit){
      subjects.forEach(sj => {
        const statusItem = checkStatusUnderTasks(sj.tasks);
        // タスクの状況に応じてステータスを変更
        if(statusItem.value !== sj.status){
          dispatch(updateSubject({subject:{...sj, status:statusItem.value}}))
        }
      })
    }
    dispatch(toggleEditMode());
  }

  return (
    <>
      <tr>
        <th rowSpan={4} className="task">タスク名
          <div>
            <FontAwesomeIcon icon={isEdit ? faToggleOn : faToggleOff} onClick={handleClickToggle} />
            編集モード{isEdit?'ON':'OFF'}
          </div>
          <AddSubjectBtn></AddSubjectBtn>
        </th>
        {calObj.years.map(y => {
          return (<th key={y.id} className="year" colSpan={calcDaysCountY(y)}>{y.val}年</th>)
        })}
      </tr>
      <tr>
        {convertToMonthList(calObj).map(m => {
          return (<th key={m.id} className="month" colSpan={m.days.length}>{m.val}月</th>)
        })}
      </tr>
      <tr>
        {convertToDayList(calObj).map(d => {
          return (<th key={d.id} className={createClassNameOfHeader(d)}>{d.val}</th>)
        })}
      </tr>
      <tr>
        {convertToDayList(calObj).map(d => {
          return (<th key={`${d.id}${d.weekDt}`} className={createClassNameOfHeader(d)}>{perseWeekDt(d.weekDt)}</th>)
        })}
      </tr>
    </>
  )

}

export default CalendarHeader;