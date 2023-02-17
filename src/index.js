import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cmsgov/ds-medicare-gov/dist/css/medicare-theme.css';
import '@cmsgov/ds-medicare-gov/dist/css/index.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
