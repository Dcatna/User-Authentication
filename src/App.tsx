import React from 'react';
import logo from './logo.svg';
import './App.css';
import Loginbox from './Login/Loginbox';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
