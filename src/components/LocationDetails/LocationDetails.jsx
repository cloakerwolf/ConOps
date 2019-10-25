import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
});

const styles = ({
    root: {
        margin: '15px',
    },
    fab : {
        margin: '15px',
        marginRight: '15px',
    }  
});

// adds dialog box to confirm location details edit
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class LocationDetails extends Component {
  // calls the function to get all the location details on page load  
    componentDidMount() {
      this.fetchLocationDetails();
    }
  // fetches all the location details for the selected location
    fetchLocationDetails = () => {
      let id = this.props.match.params.id;
      this.props.dispatch({
        type: 'FETCH_LOCATION_DETAILS',
        payload: id
      });
    }

    state = {
        LocationIsActive: true,
        openSave: false,
        details: {},
    }

    // this will close the dialog box when click cancel, confirm, or outside the dialog box
    handleCloseSave = () => {
      this.setState({ openSave: false });
    };

    // this will return you to the location page if you click cancel while creating a new event
    handleBack = () => {
        this.props.history.push("/locations");
    };

    // this sends the updated information to the database
    saveLocation = () => {
      this.props.dispatch({
        type: "UPDATE_LOCATION_DETAILS",
        payload: this.props.details
      });
      this.handleCloseSave();
      this.props.history.push('/locations');
    }

    // this triggers the dialog box to open, and sets local state to modified details
    handleSave = () => {
      this.setState({
        openSave: !this.state.openSave,
        ...this.state.details, details: this.props.details
      })
    };

    // sends active status update to the database
    handleChange = () => {
        this.props.dispatch({
            type: "EDIT_LOCATION_STATUS",
            payload: !this.props.details.LocationIsActive
        })
    }

    render() {
        return (
          <div style={{margin: '20px'}}>
            <Dialog
              open={this.state.openSave}
              onClose={this.handleCloseSave}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog"> 
                Edit Location?
              </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: 'black' }}>
                    Are you sure that you would like to edit this location?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
                  Cancel
                </Button>
                <ThemeProvider theme={theme}>
                  <Button onClick={this.saveLocation} variant="contained" color="primary">
                    Confirm
                  </Button>
                </ThemeProvider>
              </DialogActions>
            </Dialog>
            <h1>2D Con 2020: Remaster</h1>
            <h1>Manage Location: {this.props.details.LocationName}</h1>
            <TextField
              label="Name"
              InputLabelProps={{ shrink: this.props.details.LocationName }}
              className={this.props.classes.root}
              value={this.props.details.LocationName}
              onChange={event =>
                this.props.dispatch({
                  type: "EDIT_LOCATION_NAME",
                  payload: event.target.value
                })
              }
            ></TextField>
            <TextField
              label="Description"
              InputLabelProps={{ shrink: this.props.details.LocationDescription }}
              className={this.props.classes.root}
              value={this.props.details.LocationDescription}
              onChange={event =>
                this.props.dispatch({
                  type: "EDIT_LOCATION_DESCRIPTION",
                  payload: event.target.value
                })
              }
            ></TextField>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={this.props.details.LocationIsActive} />
                }
                label="Active"
                labelPlacement="start"
                onChange={this.handleChange}
              />
            </FormGroup>
            <hr></hr>
            <Button onClick={this.handleBack} variant="contained" color="secondary" style={{margin: '5px'}}>Back</Button>
            {this.props.user.authorization === 4 && (
            <ThemeProvider theme={theme}>
                <Button onClick={this.handleSave} variant="contained" color="primary" style={{ margin: '5px' }}>Save</Button>
            </ThemeProvider>
            )}
          </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.locationDetailsReducer,
        user: reduxStore.user
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(LocationDetails)));