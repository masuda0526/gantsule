import type React from "react";
import '../../../styles/Header.scss'
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { mobileWidth } from "../../../constants/Setting";
import { logout } from "../../../app/LoginInfoReducer";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { resetErrors } from "../../../app/ErrorReducer";

const Header: React.FC = () => {
  // redux
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.loginInfo.userId);

  const handleClickAuth = () => {
    dispatch(resetErrors());
    if(userId){
      if(confirm('ログアウトしてもよろしいですか？')){
        dispatch(logout());
      }
    }
  }

  // モバイルの境界値
  const border = mobileWidth;

  // モバイルかどうか判定するフラグ
  const [dispWidth, setDisplayWidth] = useState<number>(window.innerWidth);

  const isMobile = dispWidth <= border;

  // マウント時にウィンドウサイズ変更を検知するイベントリスナー
  useEffect(() => {

    const handleResize = () => {
      setDisplayWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => { window.removeEventListener('resize', handleResize) };
  }, [])

  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

  const handleClickHum = () => {
    setIsActiveMenu(!isActiveMenu);
  }

  const handleClickMenu = () => {
    dispatch(resetErrors());
    setIsActiveMenu(false);
  }

  const icon = isActiveMenu?(<FontAwesomeIcon icon={faXmark} onClick={handleClickHum}/>):(<FontAwesomeIcon icon={faBars} onClick={handleClickHum}/>)

  return (
    <header>
      <Logo></Logo>
      {isMobile ? icon : '' }
      <nav className={isActiveMenu?"is-active":""}>
        <ul>
          <li><a href="#" onClick={handleClickMenu}>TOP</a></li>
          {userId?(
            <li><a href="#/list" onClick={handleClickMenu}>プロジェクト一覧</a></li>
          ):''}
          {/* <li><a href="#/chart" onClick={handleClickMenu}>ガントチャート</a></li> */}
          <li><a href="#/login" onClick={handleClickAuth}>{userId?'ログアウト':'ログイン'}</a></li>
          {/* <li onClick={showModal}>モーダル</li> */}
        </ul>
      </nav>
    </header>
  )
}
export default Header;