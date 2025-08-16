import { useState } from 'react'
import React from 'react'
import {Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home.jsx';
import LayOut from './components/Layout.jsx';
import Contact from './components/Contact.jsx'
import Login from './components/LoginForm.jsx'
import Register from './components/RegisterForm.jsx'
function App() {
  return<>
    <LayOut>
      <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/contact'element ={<Contact/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/register'element={<Register/>}/>
      </Routes>
    </LayOut>
  </>
}

export default App
