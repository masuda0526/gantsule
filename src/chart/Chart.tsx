import type React from "react";
import '../styles/Calendar.scss'
import '../styles/index.scss'
import { CalendarBuilder } from "../component/calendar/CalendarBuilder";
import type { CalenderObjectTransfer } from "../component/calendar/CalenderInterface";
import CalendarHeader from "../component/calendar/CalendarHeader";
import CalendarSubject from "../component/calendar/CalendarSubject";
import { useEffect, useState } from "react";
import { CalendarProvider } from "../component/calendar/CalendarContext";
import { getParam, goError } from "../util/HashOperate";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setSubjects } from "../app/CurrentProjectReducer";
import axios from "axios";
import { URL } from "../constants/Url";
import type Subject from "../interface/Subject";
import { endLoading } from "../app/ModalReducer";
import { ProjectArea } from "./ProjectArea";

const Chart: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch()

  // 前の月表示数
  const [beforeMonth, setBeforeMonth] = useState<number>(0);
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

  const getProjectInfo = () => {
    const pjId = getParam('projectId');
    
    axios.get(`${URL.GET_PROJECT}?projectId=${pjId}`)
    .then(res => {
      const isSuccess = res.data.isSuccess as boolean;
      if(isSuccess){
        const subjects = res.data.data.projectData as Subject[];
        dispatch(setSubjects({subjects}));
        dispatch(endLoading());
      }else{
        // goError('取得失敗');
      }
    }).catch(error=> {
      console.log(error);
      // goError('接続エラー');
    })
  }

  useEffect(()=> {
    getProjectInfo();
  },[])

  const subjects = useAppSelector(state => state.currentProject.currentProject.subjects);
  
  return (
    <CalendarProvider>
      <div>
        <ProjectArea></ProjectArea>
        <div className="button-box">
          <button onClick={() => handleClick(true)} className="link">＜ 前へ</button>
          <button onClick={() => handleClick(false)} className="link">次へ ＞</button>
        </div>
        <div className="chart-content">
          <table className="calender">
            <tbody>
              <CalendarHeader calObj={calObj}></CalendarHeader>
              {subjects.map(sj => {
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