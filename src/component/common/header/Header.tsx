import type React from "react";
import '../../../styles/Header.scss'
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { mobileWidth } from "../../../constants/Setting";

const Header: React.FC = () => {
  // モバイルの境界値
  const border = mobileWidth;

  // モバイルかどうか判定するフラグ
  const [dispWidth, setDisplayWidth] = useState<number>(window.innerWidth);

  const isMobile = dispWidth < border;

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
    console.log(isActiveMenu)
  }

  const icon = isActiveMenu?(<FontAwesomeIcon icon={faXmark} onClick={handleClickHum}/>):(<FontAwesomeIcon icon={faBars} onClick={handleClickHum}/>)

  return (
    <header>
      <Logo></Logo>
      {isMobile ? icon : '' }
      <nav className={isActiveMenu?"is-active":""}>
        <ul>
          <li>TOP</li>
          <li>MENU1</li>
          <li>MENU2</li>
          <li>MENU3</li>
          <li>MENU4</li>
        </ul>
      </nav>
    </header>
  )
}
export default Header;