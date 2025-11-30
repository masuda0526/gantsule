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
  const l = 'abcdefghijklmnopqrstuvwxyz'
  const len = 12;
  const id = 'sj';
  let rd = '';
  for(let i = 0; i < len; i++){
    const idx = Math.floor(Math.random() * l.length);
    rd += l[idx];
  }
  return `${id}@${rd}`;
}