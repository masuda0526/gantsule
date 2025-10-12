import type React from "react";
import '../../../styles/Sidevar.scss'
import { useEffect, useState } from "react";

const Sidebar: React.FC = () => {

  // サイドバーの開閉状態
  const [isClose, setIsClose] = useState<boolean>(false);

  // サイドバーのコンテンツの表示・非表示（サイドバーの開閉状態と同期させるとサイドバーが表示し切る前にコンテンツが表示されてしまうため）
  const [isShowContent, setShowContent] = useState<boolean>(true);
  const handleClick = () => {
    setIsClose(!isClose);
  }

  useEffect(()=>{
    let delayTime:number;
    if(isClose){
      delayTime=0; // 閉じるときはすぐに消える
    }else{
      delayTime=350; // 開く時は開き切るまで少しタイムラグを持たせて表示
    }
    setTimeout(()=>{setShowContent(!isClose)}, delayTime)
  }, [isClose])

  return (
    <div className={isClose ? 'sidebar-area close' : 'sidebar-area'} >
      <button className="btn-toggle" onClick={handleClick}>{isClose?'＞':'＜'}</button>
      {isShowContent ? (
        <div className="sidebar-content">
          sidebar comingsoon...
        </div>

      ):''}
    </div>
  )
}

export default Sidebar