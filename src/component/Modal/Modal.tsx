import type React from "react";
import '../../styles/Modal.scss'
import { Loading } from "./Loading";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { MODAL_INFO } from "../../constants/Modal";
import { AddSubjectModal } from "./AddSubjectModal";
import { hide } from "../../app/ModalReducer";
export const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector(state => state.modalInfo.isShow);
  const modalType = useAppSelector(state => state.modalInfo.type);
  const handleClick = ()=>{
    if(modalType.mode !== MODAL_INFO.LOADING.mode){
      dispatch(hide())
    }
  }
  return (
    <>
      {isShow ? (
        <div className="modal" onClick={handleClick}>
          {modalType===MODAL_INFO.LOADING?(<Loading></Loading>):''}
          {modalType===MODAL_INFO.ADD_SUBJECT?(<AddSubjectModal></AddSubjectModal>):''}
        </div>
      ) : ''
      }
    </>
  )
}