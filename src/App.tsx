import './styles/Reset.scss'
import './styles/Layout.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import List from './list/List'
import Header from './component/common/header/Header'
import Sidebar from './component/common/sidebar/Sidebar'

function App() {

  return (
    <div className='wrapper'>
      <Header></Header>
      <div className="content">
        <Sidebar ></Sidebar>
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
