import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './shared/Navbar';
import Dashboard from './views/Dashboard';
import CameraView from './views/CameraView';
import InventoryList from './views/InventoryList';
import Receipt from './views/Receipt';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/inventory">
              <InventoryList />
            </Route>
            <Route exact path="/inventory/add/scanning">
              <CameraView />
            </Route>
            <Route exact path="/inventory/add/receipt/">
              <Receipt />
            </Route>
          </Switch>
        </Container>
      </div>
    );
  }
};