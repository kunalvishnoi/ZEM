import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Event from "./Component/Event";
import Create from "./Component/Create";
import Error from "./Component/Error";
import Dashboard from "./Component/Dashboard";
import Username from "./Component/Username";
import LoginForm from "./Component/LoginForm";
import Past from "./Component/Past";
import DashboardPast from "./Component/DashboardPast";
import Day1 from "./Component/Day1";
import Day2 from "./Component/Day2";
import Day3 from "./Component/Day3";
import Day4 from "./Component/Day4";
import Update from "./Component/Update";
import EventDetail from "./Component/EventDetail";
import PastEventDetail from './Component/PastEventDetail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/" component={Event} exact />
            <Route path="/event/:eventId" component={EventDetail} exact />
            <Route path="/past/:eventId" component={PastEventDetail} exact />
            <Route path="/past" component={Past} exact />
            <Route path="/login" component={LoginForm} exact />
            <Route path="/Create" component={Create} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/pastevents" component={DashboardPast} />
            <Route path="/username" component={Username} />
            <Route path="/update" component={Update} exact />
            <Route component={Error} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
