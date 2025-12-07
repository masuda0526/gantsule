import type React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { show } from "../../app/ModalReducer";
import { MODAL_INFO } from "../../constants/Modal";

export const AddSubjectBtn: React.FC = () => {
  const isEdit = useAppSelector(state => state.currentProject.isEdit);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(show({ modalType: MODAL_INFO.ADD_SUBJECT }))
  }

  return (
    <>
      {isEdit ? (
        <div onClick={handleClick}>+課題</div>
      ) : ''}
    </>
  )
}