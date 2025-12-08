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
      <p>プロジェクト期間：{project.startDt} ~ {project.endDt}</p>
      <p>依頼者：{project.client}</p>
    </div>
  )
}