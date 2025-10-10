import type React from "react";
import '../../../styles/Header.scss'

const Logo: React.FC = () => {
  return (
    <div className="icon-box">
      <div className="logo">
        <img src="/header-icon.png" alt="" />
      </div>
      <h1>guntsule</h1>
    </div>
  )
}

export default Logo;