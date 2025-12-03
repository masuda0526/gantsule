import type React from "react";
import '../../styles/Form.scss';

export const Button : React.FC<{
  label:string, 
  onClick?:React.MouseEventHandler<HTMLButtonElement> 
}> = ({label, onClick}) => {
  return (
    <button className="btn btn_primary" onClick={onClick}>{label}</button>
  )
}