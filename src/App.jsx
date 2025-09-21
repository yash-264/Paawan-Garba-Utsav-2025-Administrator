import { useState } from 'react'
import './App.css'
import AdminDashboard from './components/AdminDashboard'
import { Routes, Route } from "react-router-dom";
import Scan from './components/ScanPass';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/qrscan' element={<Scan/>} />
      </Routes>
    </>
  )
}

export default App
