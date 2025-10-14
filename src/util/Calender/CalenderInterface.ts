import type { ManipulateType } from "dayjs";

export interface CalenderSetting{
  count:number,
  unit:ManipulateType
}

export interface CalenderObjectTransfer {
  years:year[]
}

export interface year {
  val:string,
  months:month[]
}

export interface month{
  val:string,
  days:day[]
}

export interface day{
  val:string,
  weekDt:number
}

export interface CalenderCreateSet{
  val:string,
  count:number
}