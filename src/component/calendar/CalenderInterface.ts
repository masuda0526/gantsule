import type { ManipulateType } from "dayjs";

export interface CalenderSetting{
  count:number,
  unit:ManipulateType
}

export interface CalenderObjectTransfer {
  years:year[]
}

export interface year {
  id:string
  val:string,
  months:month[]
}

export interface month{
  id:string,
  val:string,
  year:string,
  days:day[]
}

export interface day{
  id:string,
  str:string,
  year:string,
  month:string,
  val:string,
  weekDt:number
}

export interface CalenderCreateSet{
  val:string,
  count:number
}