import type React from "react";
import { ButtonArea } from "../component/Form/ButtonArea";
import { EditToggleBtn } from "../component/calendar/EditToggleBtn";
import { ProjectName } from "./parts/ProjectName";
import { useAppSelector } from "../app/hook";

export const ProjectArea : React.FC = () => {
  const project = useAppSelector(state => state.currentProject.currentProject);
  return (
    <div>
      <ButtonArea option={{position:"right"}}>
        <EditToggleBtn></EditToggleBtn>
      </ButtonArea>
      <ProjectName project={project}></ProjectName>
      <p>プロジェクト期間：2025-10-10 ~ 2025-11-11</p>
      <p>依頼者：テスト株式会社</p>
    </div>
  )
}