import type React from "react";
import { testProjects } from "../testdatas/TestProjects";
import type Project from "../interface/Project";
import ProjectItem from "./ProjectItem";

const List:React.FC = () => {
  const projects:Project[] = testProjects;
  

  return (
    <div>
    {projects.map(pj => <ProjectItem {...pj}/>)}
    </div>
  )
}
export default List;