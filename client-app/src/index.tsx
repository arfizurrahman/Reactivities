import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './app/layout/styles.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App';
import { createBrowserHistory } from 'history'
import ScrollToTop from './app/layout/ScrollToTop';
import reportWebVitals from './reportWebVitals';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
