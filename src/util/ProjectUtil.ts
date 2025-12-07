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

export const createNewSubjectId = () => {
  return createRandomId(12, 's');
}

export const createNewTaskId = () => {
  return createRandomId(12, 't');
}

export const createRandomId = (len:number, prefix?:string) => {
  const l = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let rdmValue = '';
  for(let i = 0; i < len; i++){
    const idx = Math.floor(Math.random() * l.length);
    rdmValue += l[idx];
  }
  return `${prefix}-${rdmValue}`;
}