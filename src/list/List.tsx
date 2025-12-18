import type React from "react";
import type Project from "../interface/Project";
import ProjectItem from "./ProjectItem";
import '../styles/List.scss';
import axios from "axios";
import { URL } from "../constants/Url";
import { useEffect } from "react";
import { ButtonArea } from "../component/Form/ButtonArea";
import { Button } from "../component/Form/Button";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { endLoading, show, startLoading } from "../app/ModalReducer";
import { MODAL_INFO } from "../constants/Modal";
import { setProjectInfos } from "../app/ProjectInfosReducer";
import { getParam } from "../util/HashOperate";

const List: React.FC = () => {
  // redux
  const dispatch = useAppDispatch();
  const projects = useAppSelector(state => state.projectInfos.projectInfos)

  // const [projects, setProjects] = useState<Project[]>([])
  const userId = getParam('userId');

  const handleClick = () => {
    dispatch(show({ modalType: MODAL_INFO.NEW_PROJECT }))
  }

  useEffect(() => {
    dispatch(startLoading())
    const url = `${URL.GET_PROJECTS}?userId=${userId}`;
    axios.get(url)
      .then(res => {
        dispatch(setProjectInfos({ projectInfos: res.data.data.projects as Project[] }))
      }).catch(err => {
        console.log(err);
      })
    dispatch(endLoading());
  }, [userId])

  return (
    <>
      <div className="list-container">
        {(projects??[]).map(pj => <ProjectItem key={pj.projectId} {...pj} />)}
      </div>
      <ButtonArea option={{ position: 'right' }}>
        <Button label="＋新規プロジェクト追加" onClick={handleClick}></Button>
      </ButtonArea>
    </>

  )
}
export default List;