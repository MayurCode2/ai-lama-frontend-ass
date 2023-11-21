import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Projects from './pages/project/Projects'
import Upload from './pages/project/Upload'
import Episodes from './pages/project/Episodes'
import Transcript from './pages/project/Transcript'
import WidgestConfiguration from './pages/configurationFlow/WidgestConfiguration'
import Settings from './pages/setting/Settings'

function App() {
 

  return (
    <>
       <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/episodes" element={<Episodes/>}/>
        <Route path="transcript" element={<Transcript/>} />
        <Route path='widgestConfiguration' element={<WidgestConfiguration/>}/>
        <Route path='settings' element={<Settings/>}/>


      </Routes>
    </>
  )
}

export default App
