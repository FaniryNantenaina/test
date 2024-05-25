import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Base() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
       <Navbar />
       <Outlet />
    </div>
  )
}
