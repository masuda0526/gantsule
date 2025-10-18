import type React from "react";
import '../styles/Calendar.scss'
import '../styles/index.scss'
import { CalendarBuilder } from "../component/calendar/CalendarBuilder";
import type { CalenderObjectTransfer } from "../component/calendar/CalenderInterface";
import CalendarHeader from "../component/calendar/CalendarHeader";
import type Project from "../interface/Project";
import CalendarSubject from "../component/calendar/CalendarSubject";
import { useEffect, useState } from "react";
import { CalendarProvider } from "../component/calendar/CalendarContext";
import { getParam } from "../util/HashOperate";
import { getProjectItem } from "../util/ProjectUtil";

const Chart: React.FC = () => {
  // 前の月表示数
  const [beforeMonth, setBeforeMonth] = useState<number>(1);
  // 後の月表示数
  const [afterMonth, setAfterMonth] = useState<number>(3);
  // カレンダービルダー
  const cb: CalendarBuilder = new CalendarBuilder(null, beforeMonth, afterMonth);
  // カレンダーオブジェクト
  const [calObj, setCalObj] = useState<CalenderObjectTransfer>(cb.generate());

  // 前へ、次へボタンのクリックハンドラー
  const handleClick = (isPrev: boolean) => {
    if (isPrev) {
      setBeforeMonth(beforeMonth + 1)
    } else {
      setAfterMonth(afterMonth + 1)
    }
  }

  // 前の月、後ろの月表示数を監視
  useEffect(() => {
    cb.setRange(beforeMonth, afterMonth);
    setCalObj(cb.generate());
  }, [beforeMonth, afterMonth])

  // const project: Project = testProjects[1];
  const pjId = getParam('projectId');
  const project : Project = getProjectItem(pjId);
  
  return (
    <CalendarProvider>
      <div>
        <div className="button-box">
          <button onClick={() => handleClick(true)} className="link">＜ 前へ</button>
          <button onClick={() => handleClick(false)} className="link">次へ ＞</button>
        </div>
        <div className="chart-content">
          <table className="calender">
            <tbody>
              <CalendarHeader calObj={calObj}></CalendarHeader>
              {project.subjects.map(sj => {
                return <CalendarSubject key={sj.subjectId} calObj={calObj} sj={sj}></CalendarSubject>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CalendarProvider>
  )
}

export default Chart;