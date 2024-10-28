import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import Home from './Components/Home'
import Login from './Components/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Register />}/>
        <Route path='/home' element = {<Home />}/>
        <Route path='/login' element = {<Login />}/>
      </Routes>
    </div>
  )
}

export default App