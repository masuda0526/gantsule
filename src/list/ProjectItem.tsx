import type React from "react";
import type Project from "../interface/Project";
import { PROGRESS_STATUS } from "../constants/Status";
import { go } from "../util/HashOperate";
import { useAppDispatch } from "../app/hook";
import { startLoading } from "../app/ModalReducer";
import { setProject } from "../app/CurrentProjectReducer";

const ProjectItem: React.FC<Project> = (project: Project) => {
  // redux
  const dispatch = useAppDispatch();

  let taskCnt: number = 0;
  let doneCnt: number = 0;
  let trubleCnt: number = 0;

  // 各項目のカウント
  project.subjects.forEach(sub => {

    // 総タスク数カウント
    taskCnt += sub.tasks.length;
    sub.tasks.forEach(t => {

      // 完了数カウント
      if (t.status === PROGRESS_STATUS.DONE.value) {
        doneCnt++;
      }

      // 問題発生件数カウント
      if (t.status === PROGRESS_STATUS.HAS_PROBREM.value) {
        trubleCnt ++;
      }
    })
  })

  // 進捗率の計算（タスクが0の場合はエラー回避）
  let progressRatio: number = 0;
  if (taskCnt !== 0) {
    progressRatio = Math.floor((doneCnt / taskCnt * 1000)) / 10
  }
  // 表示用文章
  const trubleString = `※問題発生(${trubleCnt}件)`;
  const handleClickLink = () => {
    dispatch(startLoading());
    dispatch(setProject({project}));
    const chartUrl = `/#/chart?projectId=${project.projectId}`;
    go(chartUrl);
  }

  return (
    <div className="subject-container">
      <h2 className="title" onClick={handleClickLink}>{project.name}</h2>
      <div className="info">
        <div className="perm">プロジェクト期間：{`${project.startDt} ~ ${project.endDt}`}</div>
        <div className="client">依頼者：{project.client}</div>
        <div className="progress">
          進捗率：{taskCnt === 0 ? '-' : `${progressRatio} %`}
          {
            trubleCnt !== 0 ?(<span className="has-probrem">{trubleString}</span>):''
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectItem