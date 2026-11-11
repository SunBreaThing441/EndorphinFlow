import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// context provider
import { ContextProvider } from './Context';

ReactDOM.render(
  // <React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
