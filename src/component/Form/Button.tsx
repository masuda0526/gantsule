import type React from "react";

export const Button : React.FC<{
  label:string, 
  onClick?:React.MouseEventHandler<HTMLButtonElement> 
}> = ({label, onClick}) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}