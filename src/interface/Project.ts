import type Subject from "./Subject";

export default interface Project {
  projectId:string,
  name:string,
  startDt:string,
  endDt:string,
  client:string,
  subjects:Subject[]
}