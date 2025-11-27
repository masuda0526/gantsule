import './styles/Reset.scss'
import './styles/Layout.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import List from './list/List'
import Header from './component/common/header/Header'
import Sidebar from './component/common/sidebar/Sidebar'
import Chart from './chart/Chart'
import { Modal } from './component/Modal/Modal'

function App() {

  return (
    <div className='wrapper'>
      <Modal></Modal>
      <Header></Header>
      <div className="content">
        <Sidebar ></Sidebar>
        <div className='main'>
          <HashRouter>
            <Routes>
              <Route path='/' element={<div>TopPage coming soon...</div>} />
              <Route path='/list' element={<List></List>} />
              <Route path='/chart' element={<Chart></Chart>} />
              <Route path='/test' element={<div>テストページです</div>} />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </div>
  )
}

export default App
