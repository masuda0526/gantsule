import type React from "react";
import { useAppDispatch } from "../../app/hook";
import { show } from "../../app/ModalReducer";
import { MODAL_INFO } from "../../constants/Modal";

export const AddSubjectBtn:React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(show({modalType:MODAL_INFO.ADD_SUBJECT}))
  }

  return (
    <div onClick={handleClick}>+</div>
  )
}