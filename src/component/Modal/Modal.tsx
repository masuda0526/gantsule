import type React from "react";
import '../../styles/Modal.scss'
import { Loading } from "./Loading";
import { useAppSelector } from "../../app/hook";
import { MODAL_INFO } from "../../constants/Modal";
export const Modal: React.FC = () => {
  const isShow = useAppSelector(state => state.modalInfo.isShow);
  const modalType = useAppSelector(state => state.modalInfo.type);
  return (
    <>
      {isShow ? (
        <div className="modal">
          {modalType===MODAL_INFO.LOADING?(<Loading></Loading>):''}
        </div>
      ) : ''
      }
    </>
  )
}