import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)
