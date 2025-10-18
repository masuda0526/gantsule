import { PROGRESS_STATUS, type StatusItem, type StatusKey } from "../constants/Status"


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