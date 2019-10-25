import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home')
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}} >
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="main">
            <form className="form">
            <h1 style={{ textAlign: 'center', color: 'white', marginTop: '80px', paddingTop: '55px', paddingBottom: '70px', fontSize: '40px', backgroundSize: '200px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: 'url(https://raw.githubusercontent.com/ConOps/conops/master/LogoBlackedOut.png)' }}>Login</h1>
            <div>
              <div>
              <TextField
              style={{ marginTop: 'px', backgroundColor: 'white', paddingLeft: '5px'}}
                  autoComplete="off"
              label="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            
          </div>
            <div>
              <TextField
              style={{ margin: '10px', backgroundColor: 'white', paddingLeft: '5px' }}
                  autoComplete="off"
                label="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            
          </div>
          <div>
            <Button
                style={{ margin: '20px', color: 'white', backgroundColor: '#19375f'}}
              type="submit"
              name="submit"
              onClick={this.login}
            >Log-In</Button>
          </div>
            </div>
            </form>
      
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
