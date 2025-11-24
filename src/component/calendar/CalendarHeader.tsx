import type React from "react";
import type { CalenderObjectTransfer } from "./CalenderInterface";
import { calcDaysCountY, convertToDayList, convertToMonthList, createClassNameOfHeader, perseWeekDt } from "../../util/WeekDateUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toggleEditMode } from "../../app/CurrentProjectReducer";

const CalendarHeader: React.FC<{ calObj: CalenderObjectTransfer }> = ({ calObj }) => {
  const dispatch = useAppDispatch()
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const handleClickToggle = () => {
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