import type React from "react";
import '../../../styles/Header.scss'
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header>
      <Logo></Logo>
      <nav>
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