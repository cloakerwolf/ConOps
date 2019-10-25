import React, {Component} from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Home from '../Home/Home';

import CheckIn from '../CheckIn/CheckIn';
import Details from '../Details/Details';

import OrderId from '../OrderId/OrderId';
import PreRegister from '../PreRegister/PreRegister';

import Events from '../Events/Events';
import EventDetails from '../EventDetails/EventDetails';
import CreateEvent from '../Events/CreateEvent';

import Locations from '../Locations/Locations';
import LocationDetails from '../LocationDetails/LocationDetails';
import CreateLocation from '../Locations/CreateLocation';

import Tags from '../Tags/Tags';
import EditTag from '../Tags/EditTag';
import CreateTag from '../Tags/CreateTag';

import Conventions from '../Conventions/Conventions';
import GameLibrary from '../GameLibrary/GameLibrary';
import News from '../News/News';

import Sponsors from '../Sponsors/Sponsors';
import SponsorDetails from '../Sponsors/SponsorDetails';
import CreateSponsor from  '../Sponsors/CreateSponsor';

import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* <Route
              exact
              path="/home"
              component={Home}
            /> */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
           {/* Need to attach to logo */}
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            />

            {/* Attendee Tab */}
            <ProtectedRoute
              exact
              path="/check-in"
              component={CheckIn}
            />
            <ProtectedRoute
              exact
              path="/preregister"
              component={PreRegister}
            />
              <Route
              exact path ="/register"
              component = {RegisterPage}
              />
            {/* Events Tab */}
            <ProtectedRoute
              exact
              path="/events"
              component={Events}
            />
            <ProtectedRoute
              exact
              path="/locations"
              component={Locations}
            />

            {/* Admin */}
            <ProtectedRoute
              exact
              path="/tags"
              component={Tags}
            />
            <ProtectedRoute
              exact
              path="/edittag/:id"
              component={EditTag}
            />
            <ProtectedRoute
              exact
              path="/createTag"
              component={CreateTag}
            />
            <ProtectedRoute
              exact
              path="/conventions"
              component={Conventions}
            />  
            <ProtectedRoute
              exact
              path="/gamelibrary"
              component={GameLibrary}
            />
            <ProtectedRoute
              exact
              path="/news"
              component={News}
            />
            <ProtectedRoute
              exact
              path="/sponsors"
              component={Sponsors}
            /> 
            <ProtectedRoute
              exact
              path="/details/:id"
              component={Details}
            />      
            <ProtectedRoute
              exact
              path="/orderId/:id"
              component={OrderId}
            />      
            <ProtectedRoute
              exact
              path="/eventdetails/:id"
              component={EventDetails}
            />        
            <ProtectedRoute
              exact
              path="/location/details/:id"
              component={LocationDetails}
            />      
            <ProtectedRoute
              exact
              path="/locations/create"
              component={CreateLocation}
            />
            <ProtectedRoute
              exact
              path="/events/create"
              component={CreateEvent}
            />
            <ProtectedRoute
              exact
              path="/sponsor/details/:id"
              component={SponsorDetails}  
            />     
            <ProtectedRoute
              exact
              path="/sponsors/create"
              component={CreateSponsor}
            /> 
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
  )}
}

export default connect()(App);
