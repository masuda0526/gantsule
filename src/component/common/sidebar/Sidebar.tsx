import type React from "react";
import '../../../styles/Sidevar.scss'
import { useEffect, useState } from "react";
import { isContainRoute } from "../../../util/HashOperate";

const Sidebar: React.FC = () => {

  // サイドばーを表示したいページのハッシュ値を追記
  const urlShowSidebar : string[] = ['#/chart']

  // サイドばーを表示するかどうか
  const [isShowSidebar, setShowSidebarFlg] = useState<boolean>(isContainRoute(urlShowSidebar));

  // ハッシュ値が変更されたときに呼び出される関数
  const handleHashChange = ()=>{
    setShowSidebarFlg(isContainRoute(urlShowSidebar))
  }

  // サイドバーの開閉状態
  const [isClose, setIsClose] = useState<boolean>(false);

  // サイドバーのコンテンツの表示・非表示（サイドバーの開閉状態と同期させるとサイドバーが表示し切る前にコンテンツが表示されてしまうため）
  const [isShowContent, setShowContent] = useState<boolean>(true);
  const handleClick = () => {
    setIsClose(!isClose);
  }

  useEffect(() => {
    let delayTime: number;
    if (isClose) {
      delayTime = 0; // 閉じるときはすぐに消える
    } else {
      delayTime = 350; // 開く時は開き切るまで少しタイムラグを持たせて表示
    }
    setTimeout(() => { setShowContent(!isClose) }, delayTime)
  }, [isClose])

  // ハッシュ値の変更を監視
  useEffect(()=>{
    window.addEventListener('hashchange', handleHashChange);
    return window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      {
        isShowSidebar ? (
          <div className={isClose ? 'sidebar-area close' : 'sidebar-area'} >
            <button className="btn-toggle" onClick={handleClick}>{isClose ? '＞' : '＜'}</button>
            {isShowContent ? (
              <div className="sidebar-content">
                sidebar comingsoon...
              </div>

            ) : ''}
          </div>

        ) : ''
      }
    </>
  )
}

export default Sidebar