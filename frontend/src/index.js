import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new `createRoot` method

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create the root and render the app using `createRoot`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
