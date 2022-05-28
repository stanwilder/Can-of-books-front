import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import Profile from './Profile'
import { withAuth0 } from "@auth0/auth0-react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import WelcomePage from './WelcomePage';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {
                this.props.auth0.isAuthenticated
                  ?
                  <BestBooks />
                  :
                  <WelcomePage />
              }
            </Route>
            <Route path="/about">
              <h3>About</h3>
              <About />
            </Route>
          </Switch>
          <Footer />
        </Router>
        <Profile />
      </>
    )
  }
}

export default withAuth0(App);
