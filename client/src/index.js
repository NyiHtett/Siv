import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import AuthPage from './AuthPage/AuthPage.js';
import DashboardPage from './DashboardPage/DashboardPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App>
    <Routes>
      <Route path = "/auth" element={<AuthPage/>}/>
      <Route path = "/*"    element={<DashboardPage/>}/>
    </Routes>
  </App>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

