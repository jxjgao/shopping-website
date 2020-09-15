import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPage from './containers/MainPage/MainPage';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render () {
    return (
      <div>
          <Layout>
            <MainPage />
          </Layout>
      </div>
    );
  }
}

export default App;
