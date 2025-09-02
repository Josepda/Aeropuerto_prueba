import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'

const Root = () => {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  // If no token and not on /login, redirect to /login. We keep this simple: the App contains /login route.
  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />
  }
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>,
)
