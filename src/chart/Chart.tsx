import type React from "react";
import '../styles/Calendar.scss'
import { CalendarBuilder } from "../component/calendar/CalendarBuilder";
import type { CalenderObjectTransfer } from "../component/calendar/CalenderInterface";
import CalendarHeader from "../component/calendar/CalendarHeader";
import type Project from "../interface/Project";
import { testProjects } from "../testdatas/TestProjects";
import CalendarSubject from "../component/calendar/CalendarSubject";
import { useEffect, useState } from "react";

const Chart: React.FC = () => {
  const [beforeMonth, setBeforeMonth] = useState<number>(1);
  const [afterMonth, setAfterMonth] = useState<number>(3);
  const cb: CalendarBuilder = new CalendarBuilder(null, beforeMonth, afterMonth);
  const [calObj, setCalObj] = useState<CalenderObjectTransfer>(cb.generate());

  const handleClick = (isPrev: boolean) => {
    if (isPrev) {
      setBeforeMonth(beforeMonth + 1)
    } else {
      setAfterMonth(afterMonth + 1)
    }
  }

  useEffect(() => {
    cb.setRange(beforeMonth, afterMonth);
    setCalObj(cb.generate());
  }, [beforeMonth, afterMonth])

  const project: Project = testProjects[0];
  console.log(project);
  return (
    <div>
      <div>
        <button onClick={() => handleClick(true)}>前月へ</button>
        <button onClick={() => handleClick(false)}>次へ</button>
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
  )
}

export default Chart;