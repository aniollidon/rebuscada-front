import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si voleu començar a mesurar el rendiment de l'aplicació, passeu una funció
// per registrar resultats (per exemple: reportWebVitals(console.log))
// o envieu-los a un endpoint d'analítica. Més informació: https://bit.ly/CRA-vitals
reportWebVitals();
