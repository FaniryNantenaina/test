import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Categories from './Category/Categories'

import './index.css'
import Base from './layouts/Base'
import Products from './Product/Products'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <App/>
  </React.StrictMode>,
)
