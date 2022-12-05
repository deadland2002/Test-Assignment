import { useEffect, useState } from 'react'
import './App.css'
import Home from './assets/Home';
import { SignUp } from './assets/SignUp';
import { Account } from './assets/Account';
import { Login } from './assets/Login';
import ViewAll from './assets/ViewAll';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import axios from 'axios';

var f = true;

function App() {

  


  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/ViewAll" element={<ViewAll/>} />
    </Routes>
  )

}

export default App
