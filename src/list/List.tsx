import type React from "react";
import { testProjects } from "../testdatas/TestProjects";
import type Project from "../interface/Project";
import ProjectItem from "./ProjectItem";
import '../styles/List.scss';

const List:React.FC = () => {
  const projects:Project[] = testProjects;

  return (
    <div>
    {projects.map(pj => <ProjectItem key={pj.projectId} {...pj}/>)}
    </div>
  )
}
export default List;