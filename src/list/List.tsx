import type React from "react";
import type Project from "../interface/Project";
import ProjectItem from "./ProjectItem";
import '../styles/List.scss';
import axios from "axios";
import { URL } from "../constants/Url";
import { useEffect, useState } from "react";

const List:React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const userId = 'u00001';
  
  useEffect(()=>{
    const url = `${URL.GET_PROJECTS}?userId=${userId}`;
    axios.get(url)
    .then(res => {
      setProjects(res.data.data.projects as Project[])
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="list-container">
    {projects.map(pj => <ProjectItem key={pj.projectId} {...pj}/>)}
    </div>
  )
}
export default List;