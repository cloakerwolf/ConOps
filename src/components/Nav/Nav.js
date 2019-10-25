import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Button from '@material-ui/core/Button'; 
import AttendessNav from './AttendessNav';
import EventsNav from './EventsNav';
import AdminNav from './AdminNav';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <img src="https://raw.githubusercontent.com/ConOps/conops/master/Logo-White.png" alt="2D Con Logo" height="100px" className="nav-title" ></img>
    </Link>
    <div className="nav-right">
      
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? <Button style={{ color: 'white', padding: '12px', fontSize: '20px' }}>Home</Button> : <Button style= {{color: 'white', padding: '12px', fontSize: '20px'}}></Button>}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <AttendessNav className="nav-link"/>
          <EventsNav className="button"/>
          <AdminNav className="button"/>
          <LogOutButton />
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
