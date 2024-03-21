import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './app'
import './index.css'
import { Toaster } from 'sonner' //biblioteca para alertas (ex: alerta de que alguma operação deu certo/errado)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors /> {/* 'richColors' vai deixar o aviso verdinho */}
  </React.StrictMode>,
)
