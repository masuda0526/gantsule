import type React from "react";
import '../../styles/Form.scss'
import { useState } from "react";
import type { ErrorInfo } from "../../util/validation/ValidationTypes";
import { ValidatorStringParser } from "../../util/validation/ValidatorStringParser";

type Option = {
  placeFolder?:string
  validRules?:string
}
export const TextInput : React.FC<{
  title:string, 
  field:string,
  value:string, 
  onChange?:React.ChangeEventHandler<HTMLInputElement>
  option?:Option
}> = ({title,field, value, onChange, option}) => {
  const[errors, setErrors] = useState<ErrorInfo[]>([]);
  const v = new ValidatorStringParser(field, value, title, option?.validRules??'').build()

  const handleBlur = () => {
    const errs:ErrorInfo[] = []
    v.validate(errs, false);
    setErrors(errs)
  }

  return (
    <label className="label" htmlFor="">
      <p>{title}</p>
      {errors.length>0?(
        errors.map((e,idx) => {
          return <p key={idx}>{e.message}</p>
        })
      ):''}
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={option?.placeFolder??''}
      />
    </label>
  )
}