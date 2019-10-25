import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

class News extends Component {

    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_NEWS',
        })
    }

    render(){
        return (
          <div style={{margin:'20px', marginTop:'60px'}}>
            <h1>News</h1>
            <TextField
              label="Convention News"
              InputLabelProps={{ shrink: this.props.reduxStore.homePageReducer.ConventionNews}}
              value={this.props.reduxStore.homePageReducer.ConventionNews}
              fullWidth
              multiline
              rowsMax = "4"
              onChange={event =>
                this.props.dispatch({
                  type: "EDIT_CONVENTION_NEWS",
                  payload: event.target.value
                })
              }
            ></TextField>
            <hr></hr>
            {this.props.reduxStore.user.authorization === 4 &&
              <ThemeProvider theme={theme}>
            <Button variant= "contained" color= "primary" onClick = {() => {
                this.props.dispatch({
                    type: 'SAVE_CONVENTION_NEWS',
                    payload: this.props.reduxStore.homePageReducer
                })
            }}>
                Save
            </Button>
            </ThemeProvider>
            }
          </div>
        );
}}

const mapStateToProps = reduxStore => {
    return{
        reduxStore
    };
}
export default connect(mapStateToProps)(News);