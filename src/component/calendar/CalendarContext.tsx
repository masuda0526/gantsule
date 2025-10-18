import dayjs, { Dayjs } from "dayjs";
import ja from 'dayjs/locale/ja';
import type React from "react"
import { createContext, useContext, useState } from "react";

dayjs.locale(ja);

type CalendarContextType = {
  taskId: string;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  startDt:Dayjs|null;
  setStartDt:React.Dispatch<React.SetStateAction<Dayjs|null>>;
  endDt:Dayjs|null;
  setEndDt:React.Dispatch<React.SetStateAction<Dayjs|null>>;
  resetAll: () => void;
  setSpan: (dayStr:string) => void;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskId, setTaskId] = useState<string>('');
  const [startDt, setStartDt] = useState<Dayjs|null>(null);
  const [endDt, setEndDt] = useState<Dayjs|null>(null);

  const resetAll = () => {
    setTaskId('');
    setStartDt(null);
    setEndDt(null);
  }

  const setSpan = (dayStr: string) => {
    const targetDt = dayjs(dayStr);
    if(!startDt){
      setStartDt(targetDt);
      setEndDt(targetDt);
    }else{
      if(targetDt.isBefore(startDt, 'day')){
        setEndDt(startDt);
        setStartDt(targetDt);
      }else if(targetDt.isAfter(startDt, 'day')){
        setEndDt(targetDt);
      }
    }

  }

  return (
    <CalendarContext.Provider value={{ taskId, setTaskId, startDt, setStartDt,endDt, setEndDt, resetAll, setSpan }}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error('CalendarContextの中でのみ使用できます');
  return ctx;
}

