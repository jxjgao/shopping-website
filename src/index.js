import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';


import './index.module.css';
import App from './App';

const store = createStore(reducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
       <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>     
)


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
