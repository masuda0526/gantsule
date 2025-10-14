import type React from "react";
import { Calenderbuilder } from "../util/Calender/CalenderBuilder";
import CalendarHeader from "../component/calendar/CalenderHeader";

const Chart: React.FC = () => {
  const dto: Calenderbuilder = new Calenderbuilder();
  console.log(dto)
  return (
    <table className="calender">
      <tbody>
        <CalendarHeader calendarBuilder={dto}></CalendarHeader>
      </tbody>
    </table>
  )
}

export default Chart;