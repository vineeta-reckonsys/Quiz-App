// import { useState } from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.scss'
import Login from './components/Login'

import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Quiz from './components/Quiz'
import Result from './components/Result'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
     
      <Route element={<><PrivateRoute /></>}>
      <Route path='/dashboard'  element={<Dashboard />}/>
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/response" element={<Result />} />
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
