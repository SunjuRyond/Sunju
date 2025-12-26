
import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Use namespace import to bypass type errors for HashRouter
import * as Router from 'react-router-dom';
const { HashRouter } = Router as any;
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
