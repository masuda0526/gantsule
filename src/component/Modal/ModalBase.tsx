import type React from "react";
import { useAppDispatch } from "../../app/hook";
import { hide } from "../../app/ModalReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { resetErrors } from "../../app/ErrorReducer";

type modalOption = {
  closeBtn?:boolean;
  width?:number;
}

export const ModalBase:React.FC<{children:React.ReactNode, title:string, option?:modalOption}> = ({children, title, option})=>{
  // デフォルト設定
  const {
    closeBtn=true, 
    width=400
  } = option ||{};
  const dispatch = useAppDispatch();
    const clickClose = () => {
      dispatch(resetErrors());
      dispatch(hide())
    }
  return (
    <div className="modal-area" style={{width:width}} onClick={(e)=>e.stopPropagation()}>
      {closeBtn?(
        <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={clickClose}/>
      ):''}
      <h3 className="title">{title}</h3>
      {children}
    </div>
  )
}