import type React from "react";
import '../../styles/Loading.scss';


export const Loading:React.FC = () => {
  return (
    <div className="loading-area">
      <div className="loading-spinner"></div>
      <p className="loading-message">...Loading</p>
    </div>
  )
}