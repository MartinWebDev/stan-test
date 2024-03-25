import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root")!);

// Recommend not to use strict mode on this tiny project as its built in double render causes extra api calls, 
// which is fine normally, we can compensate for it at least, but as we want those occasional crashes and 
// random delay times from the mini server, it just becomes annoying.
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
