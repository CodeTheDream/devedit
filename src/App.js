import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Dashboard from "./containers/Dashboard";
import * as ROUTES from "./constants/routes.js";
import About from "./containers/About";
import SignUp from "./components/SignUp"
import SignInPage from "./components/SignIn"
import { withAuthentication } from './components/Session';

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route exact path={ROUTES.HOME} component={Dashboard} />
            <Route exact path={ROUTES.ABOUT} component={About} />
            <Route exact path={ROUTES.SIGNUP} component={SignUp}/>
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage}/>

          </Switch>
          <Footer />
        </Router>
    </div>
  );
}

export default withAuthentication(App);

