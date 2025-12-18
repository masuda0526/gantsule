import type React from "react";
import { useAppSelector } from "../../../app/hook";
import '../../../styles/Error.scss';

export const Errors:React.FC = () => {
  const errors = useAppSelector(state => state.errorStore.errors);

  return (
    <>
      {errors.length > 0?(
        <div className="error-container">
          <ul className="error-box">
          {errors.map((e, idx) => 
            <li key={idx} className="error-msg">{e.message}</li>
          )}
          </ul>
        </div>
      ):''}
    </>
  ) 
  
}