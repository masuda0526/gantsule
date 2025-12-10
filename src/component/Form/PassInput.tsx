import type React from "react";
import '../../styles/Form.scss'
import { useState } from "react";
import type { ErrorInfo } from "../../util/validation/ValidationTypes";
import { ValidatorStringParser } from "../../util/validation/ValidatorStringParser";

type Option = {
  placeFolder?: string
  validRules?: string
}
export const PassInput: React.FC<{
  title: string,
  field: string,
  value: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  option?: Option
}> = ({ title, field, value, onChange, option }) => {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const v = new ValidatorStringParser(field, value, title, option?.validRules ?? '').build()
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(onChange){
      onChange(e)
    }
  }
  const handleBlur = () => {
    const errs: ErrorInfo[] = []
    v.validate(errs, false);
    setErrors(errs)
  }

  return (
    <label className="label" htmlFor="">
      <p>{title}</p>
      <input
        type="password"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={option?.placeFolder ?? ''}
      />
      {errors.length > 0 ? (
        errors.map((e, idx) => {
          return <p className="valid-error" key={idx}>{e.message}</p>
        })
      ) : ''}
    </label>
  )
}