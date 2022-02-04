import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import initFacebookSDK from "./util/facebookUtil";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './asset/css/style.css'

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

initFacebookSDK().then(() => {
  renderApp();
});