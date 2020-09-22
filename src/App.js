import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import Cart from './containers/Cart/Cart';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/home" component={MainPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
