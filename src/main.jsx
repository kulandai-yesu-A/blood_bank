import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'; 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer 
              position='bottom-right'
              theme='colored'
              />
  </StrictMode>,
)
