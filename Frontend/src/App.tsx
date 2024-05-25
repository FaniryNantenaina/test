import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layouts/Navbar'; 
import Categories from './Category/Categories';
import Products, { Category, Product } from './Product/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './layouts/Base';

function App() { 
 

  return (
    <BrowserRouter>
    
    <Routes >
   
      <Route element={<Base/>}>
      <Route path='/products' element={ <Products />}></Route>

      <Route path='/categories' element={ <Categories />}></Route>
      </Route>
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
