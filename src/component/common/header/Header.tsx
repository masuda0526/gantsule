import type React from "react";
import '../../../styles/Header.scss'
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { mobileWidth } from "../../../constants/Setting";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { logout, setLoginInfo } from "../../../app/LoginInfoReducer";
import { hide, show, startLoading } from "../../../app/ModalReducer";
import { MODAL_INFO } from "../../../constants/Modal";

const Header: React.FC = () => {
  // test
  const isLogin = useSelector((state:RootState) => state.loginInfo.isLogin)
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = ()=>{
    dispatch(setLoginInfo({isLogin:true, limitDt:'2025-11-12', token:'aaa', userId:'u00001'}));
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const showModal = () => {
    dispatch(startLoading())
  }
  // test
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
          <li><a href="#/list" onClick={handleClickMenu}>プロジェクト一覧</a></li>
          <li><a href="#/chart" onClick={handleClickMenu}>ガントチャート</a></li>
          {isLogin?(<li onClick={handleLogout}>ログイン中</li>):(<li onClick={handleLogin}>未ログイン</li>)}
          <li onClick={showModal}>モーダル</li>
        </ul>
      </nav>
    </header>
  )
}
export default Header;