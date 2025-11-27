import { PROGRESS_STATUS, type StatusItem, type StatusKey } from "../constants/Status"
import type Task from "../interface/Task";


export const getDispString = (val:string):string => {
  return getStatuByval(val).display;
}

export const getStatuByval = (val:string):StatusItem => {
  let st : StatusItem | undefined;
  for (const key of Object.keys(PROGRESS_STATUS) as StatusKey[]){
    st = PROGRESS_STATUS[key];
    if(st.value === val){
      return st
    }
  }
  throw new Error(`不正な値が入力されました`);
};

export const hasProbrem = (val:string) => {
  return val === PROGRESS_STATUS.HAS_PROBREM.value
}

export const checkStatusUnderTasks = (tasks:Task[]) => {
  let noStartCnt = 0;
  let hasProbremCnt = 0;
  let compCnt = 0;
  const taskCnt = tasks.length;
  tasks.forEach(task => {
    const status = task.status;
    if(status === PROGRESS_STATUS.HAS_PROBREM.value){
      hasProbremCnt++
    }
    if(status === PROGRESS_STATUS.DONE.value){
      compCnt++;
    }
    if(status === PROGRESS_STATUS.NO_START.value){
      noStartCnt++;
    }
  })

  if(hasProbremCnt > 0){
    return PROGRESS_STATUS.HAS_PROBREM
  }

  if(noStartCnt === taskCnt){
    return PROGRESS_STATUS.NO_START
  }

  if(compCnt === taskCnt){
    return PROGRESS_STATUS.DONE
  }

  return PROGRESS_STATUS.UNDER_TAKING
}