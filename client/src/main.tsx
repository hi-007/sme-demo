// src/main.tsx
// import "@fontsource/noto-sans/400.css";
// import "@fontsource/noto-sans/400-italic.css";
// import "@fontsource/noto-sans/700.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import ScrollToTop from './ScrollToTop'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
       <ScrollToTop /> 
      <App />
    </Router>
  </React.StrictMode>
);
