import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


import './index.module.css';
import App from './App';


const app = (
  <BrowserRouter>
      <App />
  </BrowserRouter>
)


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
