import type React from "react";
import '../../styles/Form.scss'

type Option = {
  placeFolder?:string
}
export const TextInput : React.FC<{
  title:string, 
  value:string, 
  onChange?:React.ChangeEventHandler<HTMLInputElement>
  option?:Option
}> = ({title, value, onChange, option}) => {

  return (
    <label className="label" htmlFor="">
      <p>{title}</p>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder={option?.placeFolder??''}
      />
    </label>
  )
}