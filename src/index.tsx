import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import AppAlt from './AppAlt';
import { AuthProvider } from "react-oidc-context";
import reportWebVitals from './reportWebVitals';
import './index.css';

const oidcConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_bPesfcUZG",
  //authority: "https://trg.auth.us-east-1.amazoncognito.com/trg-software-users",
  client_id: "4rts2aoe8mf0mfgapqcd3i8dc2", // trg-web-ui
  redirect_uri: "https://trgsoftware.net", // use http://localhost:3000 for local development
  responseType: 'code',
  scope: 'openid profile'
};


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
