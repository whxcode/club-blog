import React from 'react';
import ReactDOM from 'react-dom';
import './common.less'
import * as serviceWorker from './serviceWorker'
import store from '@/store/store'

import App from "./App"

import { Provider } from "react-redux";
import { BrowserRouter,HashRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
      <Provider store={ store }>
          <App />
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
