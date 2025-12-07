import type Project from "../../../interface/Project";
import type Subject from "../../../interface/Subject";
import type Task from "../../../interface/Task";
import { ValidationBuilder } from "../ValidationBuilder";
import type { ValidationContext } from "../ValidationContext";

export const addProjectValidator = (project:Project, vc:ValidationContext, pjIdReqCheck:boolean) => {
  const nameV = new ValidationBuilder('project', project.name, 'プロジェクト名').require().txtmax(30)
  const stDtV = new ValidationBuilder('p-sdt', project.startDt, 'プロジェクト開始日').require()
  const edDtV = new ValidationBuilder('p-edt', project.endDt, 'プロジェクト終了日').require()
  const clientV = new ValidationBuilder('client', project.client, '依頼者').require()

  if(pjIdReqCheck){
    const pjIdV = new ValidationBuilder('projectId', project.projectId, 'プロジェクトID').require();
    vc.add(pjIdV);
  }

  vc.add(nameV)
  vc.add(stDtV)
  vc.add(edDtV)
  vc.add(clientV)
}

export const addSubjectsValidator = (subjects:Subject[], vc:ValidationContext) => {
  subjects.forEach(sj => {
    addSubjectValidator(sj, vc);
  })
}

export const addSubjectValidator = (sj:Subject, vc:ValidationContext) => {
  const requireMsgTmpl = '{attr}は必須項目です。（課題ID:{0}）';
  const txtmaxMsgTmpl = '{attr}は{max}文字で入力してください（タスクID:{0}）';

  const nameV = new ValidationBuilder(`${sj.subjectId}-name`, sj.name, '課題名')
    .require(requireMsgTmpl, sj.subjectId)
    .txtmax(30, txtmaxMsgTmpl, sj.subjectId);
  
  const sjIdV = new ValidationBuilder(`${sj.subjectId}-sid`, sj.subjectId, '課題ID')
    .require(requireMsgTmpl, sj.subjectId)
  
  const stDtV = new ValidationBuilder(`${sj.subjectId}-sdt`, sj.startDt, '開始日')

  const edDtV = new ValidationBuilder(`${sj.subjectId}-edt`, sj.endDt, '終了日')

  const statusV = new ValidationBuilder(`${sj.subjectId}-status`, sj.status, '進捗状況')

  const leaderV = new ValidationBuilder(`${sj.subjectId}-leader`, sj.leader, 'リーダー名')
    .require(requireMsgTmpl, sj.subjectId)
    .txtmax(30, txtmaxMsgTmpl, sj.subjectId)

  vc.add(nameV)
  vc.add(sjIdV)
  vc.add(stDtV)
  vc.add(edDtV)
  vc.add(statusV)
  vc.add(leaderV)
  addTasksValidator(sj.tasks, vc)
  
}

export const addTasksValidator = (tasks:Task[], vc:ValidationContext) => {
  tasks.forEach(task => {
    addTaskValidator(task, vc);
  })
}

export const addTaskValidator = (task:Task, vc:ValidationContext) => {
  // バリデーション用メッセージ
  const requireMsgTmpl = '{attr}は必須項目です。（タスクID:{0}）';
  const txtmaxMsgTmpl = '{attr}は{max}文字で入力してください（タスクID:{0}）';

  // 構築
  const nameV = new ValidationBuilder(`${task.taskId}-name`, task.name, 'タスク名')
    .require(requireMsgTmpl, task.taskId)
    .txtmax(30, txtmaxMsgTmpl, task.taskId);

  const taskIdV = new ValidationBuilder(`${task.taskId}-tid`, task.taskId, 'タスクID')
    .require(requireMsgTmpl, task.taskId)

  const sIdV = new ValidationBuilder(`${task.taskId}-sid`, task.subjectId, '課題ID')
    .require(requireMsgTmpl, task.taskId);

  const stDtV = new ValidationBuilder(`${task.taskId}-sdt`, task.startDt, '開始日')

  const edDtV = new ValidationBuilder(`${task.taskId}-edt`, task.endDt, '終了日')

  const statusV = new ValidationBuilder(`${task.taskId}-status`, task.status, '進捗状況')

  const managerV = new ValidationBuilder(`${task.taskId}-mng`, task.manager, '担当者')
    .require(requireMsgTmpl, task.taskId)
    .txtmax(30, txtmaxMsgTmpl, task.taskId)

  vc.add(nameV)
  vc.add(taskIdV)
  vc.add(sIdV)
  vc.add(stDtV)
  vc.add(edDtV)
  vc.add(statusV)
  vc.add(managerV);

}