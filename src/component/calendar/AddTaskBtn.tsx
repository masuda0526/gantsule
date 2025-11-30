import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useAppDispatch } from "../../app/hook";
import { show } from "../../app/ModalReducer";
import { MODAL_INFO } from "../../constants/Modal";
import { tmpStore } from "../../util/TempValueStore";

export const AddTaskBtn : React.FC<{subjectId:string}> = ({subjectId}) => {
  const store = tmpStore;
  const dispacth = useAppDispatch();
  const handleClick = () => {
    store.put('subjectId', subjectId);
    dispacth(show({modalType:MODAL_INFO.ADD_TASK}))
  }
  
  return (
    <span onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      タスク
    </span>
  )
}