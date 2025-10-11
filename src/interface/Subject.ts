import type Task from "./Task";

export default interface Subject {
  name:string,
  startDt:string,
  endDt:string,
  status:string,
  leader:string,
  tasks:Task[]
}