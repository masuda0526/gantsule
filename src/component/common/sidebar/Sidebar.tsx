import type React from "react";
import '../../../styles/Sidevar.scss'
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isClose, setIsClose] = useState<boolean>(false);
  const handleClick = () => {
    setIsClose(!isClose);
  }

  return (
    <div className={isClose ? 'sidebar-area close' : 'sidebar-area'} >
      <button className="btn-toggle" onClick={handleClick}>{isClose?'＞':'＜'}</button>
      {isClose ? '' : (
        <div className="sidebar-content">
          sidebar comingsoon...
        </div>

      )}
    </div>
  )
}

export default Sidebar