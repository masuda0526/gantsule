import type React from "react";
import type Project from "../interface/Project";
import ProjectItem from "./ProjectItem";
import '../styles/List.scss';
import axios from "axios";
import { URL } from "../constants/Url";
import { useEffect, useState } from "react";
import { ButtonArea } from "../component/Form/ButtonArea";
import { Button } from "../component/Form/Button";
import { useAppDispatch } from "../app/hook";
import { show } from "../app/ModalReducer";
import { MODAL_INFO } from "../constants/Modal";

const List:React.FC = () => {
  // redux
  const dispatch = useAppDispatch();

  const [projects, setProjects] = useState<Project[]>([])
  const userId = 'u00001';

  const handleClick = () => {
    dispatch(show({modalType:MODAL_INFO.NEW_PROJECT}))
  }
  
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
    <>
    <div className="list-container">
    {projects.map(pj => <ProjectItem key={pj.projectId} {...pj}/>)}
    </div>
    <ButtonArea option={{position:'right'}}>
      <Button label="＋新規プロジェクト追加" onClick={handleClick}></Button>
    </ButtonArea>
    </>

  )
}
export default List;