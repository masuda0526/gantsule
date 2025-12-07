import type React from "react";
import type Project from "../../interface/Project";
import { useAppDispatch } from "../../app/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { show } from "../../app/ModalReducer";
import { MODAL_INFO } from "../../constants/Modal";

export const ProjectName:React.FC<{project:Project}> = ({project}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(show({modalType:MODAL_INFO.EDIT_PROJECT}))
  }
  return (
    <h2>
      {project.name}
        <FontAwesomeIcon 
          icon={faPenToSquare}
          onClick={handleClick}
        ></FontAwesomeIcon>
    </h2>
  )
}