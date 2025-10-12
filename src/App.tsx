// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './styles/Layout.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import List from './list/List'
import Header from './component/common/header/Header'
import Sidebar from './component/common/sidebar/Sidebar'
import { useEffect, useState } from 'react'

function App() {
  // サイドばーを表示したいページのハッシュ値を追記
  const urlShowSidebar : string[] = ['#chart']

  // サイドばーを表示するかどうか
  const [isShowSidebar, setShowSidebarFlg] = useState<boolean>(urlShowSidebar.includes(window.location.hash));

  // ハッシュ値が変更されたときに呼び出される関数
  const handleHashChange = ()=>{
    setShowSidebarFlg(urlShowSidebar.includes(window.location.hash))
  }

  // ハッシュ値の変更を監視
  useEffect(()=>{
    window.addEventListener('hashchange', handleHashChange);
    return window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className='wrapper'>
      <Header></Header>
      <div className="content">
        <Sidebar showSidebar={isShowSidebar}></Sidebar>
        <div className='main'>
          <HashRouter>
            <Routes>
              <Route path='/' element={<div>TopPage coming soon...</div>} />
              <Route path='/list' element={<List></List>} />
              <Route path='/test' element={<div>テストページです</div>} />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </div>
  )
}

export default App
