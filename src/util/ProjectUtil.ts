import type Project from "../interface/Project";
import { testProjects } from "../testdatas/TestProjects";
import { goError } from "./HashOperate";

export const getProjectItem = (pjId:string):Project => {
  const data = testProjects.find(pj => pj.projectId === pjId);
  if(!data){
    goError('誤ったIDが入力されました');
    throw new Error();
  }
  return data;
}