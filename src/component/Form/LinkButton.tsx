import type React from "react";
import '../../styles/Form.scss';

export const LinkButton : React.FC<{
  label:string, 
  onClick?:React.MouseEventHandler<HTMLButtonElement> 
}> = ({label, onClick}) => {
  return (
    <button className="linkbtn" onClick={onClick}>{label}</button>
  )
}