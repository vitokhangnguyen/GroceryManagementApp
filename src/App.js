import React from 'react';
import 'react-dates/initialize';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Dashboard from './views/Dashboard';
import CameraView from './views/CameraView';
import InventoryList from './views/InventoryList';
import Receipt from './views/Receipt';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-dates/lib/css/_datepicker.css';
import './App.css';
import Stores from "./assets/data/store_location.json"

class App extends React.Component {
  static mainExcludesPaddingOn = [
    '/inventory',
  ];

  render() {
    return (
      <div id="App">
        <header>
          <Navbar />
        </header>
        <main className={
          App.mainExcludesPaddingOn.includes(this.props.location.pathname) ? 'p-0' : null
        }>
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
              <Route exact path="/inventory/add/receipt">
                <Receipt />
              </Route>
              <Route exact path="/inventory/add/receipt/scanned">
                <Receipt scanResult={{
                  selectedLocation: Stores[0],
                  receiptItems: [
                    {
                        name: "Bulk Carrot",
                        imageFile: "bulk_carrot.png",
                        brandName: "No Name",
                        brandLogoFile: "noname.png",
                        categories: [{
                          name: "Vegetable",
                          color: "white",
                          backgroundColor: "#77B255",
                        }],
                        expiryDate: null,
                        expiryDateFocused: false,
                    }
                  ],
                }} />
              </Route>
            </Switch>
        </main>
      </div>
    );
  }
};

export default withRouter(App);