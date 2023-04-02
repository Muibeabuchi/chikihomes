import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.css';
import ModalContextProvider from './context/ModalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalContextProvider>

    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </Router>
    </ModalContextProvider>
  </React.StrictMode>,
)
