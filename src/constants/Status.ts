
export interface StatusItem {
  value:string,
  display:string,  
}

export type StatusKey = "NO_START"|"UNDER_TAKING"|"SUSPENDED"|"HAS_PROBREM"|"DONE";

type Status = Record<StatusKey,StatusItem>;

export const PROGRESS_STATUS:Status = {
  NO_START:{
    value:'00',
    display:'未着手'
  },
  UNDER_TAKING:{
    value:'10',
    display:'進行中'
  },
  SUSPENDED:{
    value:'20',
    display:'中断中'
  },
  HAS_PROBREM:{
    value:'30',
    display:'問題発生'
  },
  DONE:{
    value:'40',
    display:'完了'
  }
}