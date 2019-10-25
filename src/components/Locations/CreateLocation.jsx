import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
});

// adds dialog box to confirm a new location
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class CreateLocation extends Component {
  // dialog box is closed when the page loads, until select save
  state ={
    openSave: false,
  }

  // this will close the dialog box when click cancel, confirm, or outside the dialog box
  handleCloseSave = () => {
    this.setState({ openSave: false });
  };

  // this will return you to the location page if you click cancel while creating a new event
  handleCancel = () => {
      this.props.history.push('/locations');
  }

  // sends the new location information to the database
  saveLocation = () => {
    this.props.dispatch({
      type: "ADD_LOCATION",
      payload: this.props.details
    });
    this.handleCloseSave();
    this.props.history.push('/locations');
  }

  // this triggers the dialog box to open when you click save
  handleSave = () => {
    this.setState({
      openSave: !this.state.openSave,
    })
  }

    render() {
        return (
          // sets margin for the input fields
          <div style={{margin:'20px'}}>
            <Dialog
              open={this.state.openSave}
              onClose={this.handleCloseSave}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                Create Location?
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                  Are you sure that you would like to create this location?
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

            <h1>Create Location</h1>
            <TextField
              label="Name"
              className={this.props.classes.root}
              onChange={event =>
                this.props.dispatch({
                  type: "CREATE_LOCATION_NAME",
                  payload: event.target.value
                })
              }
            ></TextField>
            <TextField
              label="Description"
              className={this.props.classes.root}
              onChange={event =>
                this.props.dispatch({
                  type: "CREATE_LOCATION_DESCRIPTION",
                  payload: event.target.value
                })
              }
            ></TextField>
            <hr></hr>
            <Button onClick={this.handleCancel} variant="contained" color="secondary" style={{margin:'5px'}}> Cancel</Button>
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

export default withStyles(styles)(connect(mapStateToProps)(CreateLocation));