//Importa o React 
import React from 'react';
//Apontamos que é para Web, dom é a árvore de elementos do HTML
import ReactDOM from 'react-dom';
import App from './App';

//Pede para renderizar o APP dentro da root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
