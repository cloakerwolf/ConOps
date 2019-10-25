import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class Conventions extends Component {
  state = {
    openEdit: false,
    openSave: false,
    info: {},
    ConventionStartTime: '2021-08-18T00:00:00.000Z',
    ConventionEndTime: '2021-08-22T00:00:00.000Z',
    ConventionName: ''
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleCloseSave = () => {
    this.setState({ openSave: false });
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONVENTION"
    });
  }

  handleConventionName = event => {
    this.setState({
      ConventionName: event.target.value
    });
  };

  conventionStartDate = date => {
    this.setState({
      ConventionStartTime: date
    });
  };

  conventionEndDate = date => {
    this.setState({
      ConventionEndTime: date
    });
  };

  newConvention = () => {
    this.setState({
      openSave: !this.state.openSave,
    })
  };

  saveConvention = () => {
    this.props.dispatch({
      type: "ADD_NEW_CONVENTION",
      payload: this.state
    });
    this.handleCloseSave();
  }

  updateName = event => {
    this.props.dispatch({
      type: "UPDATE_NAME",
      payload: event.target.value
    });
  };

  updateStartTime = date => {
    this.props.dispatch({
      type: "UPDATE_START_TIME",
      payload: date
    });
  };

  updateEndTime = date => {
    this.props.dispatch({
      type: "UPDATE_END_TIME",
      payload: date
    });
  };

  editConvention = () => {
    this.setState({
      openEdit: !this.state.openEdit,
      ...this.state.info, info: this.props.info
    })
  };

  editConventionSave = () => {
    this.props.dispatch({
      type: "UPDATE_CONVENTION",
      payload: this.props.info
    });
    this.handleCloseEdit();
  }

  addNewConventionForDemo = () => {
    this.setState({
      ...this.state,
      ConventionStartTime: '2021-08-18T00:00:00.000Z',
      ConventionEndTime: '2021-08-22T00:00:00.000Z',
      ConventionName: '2dCon 2021: Back To The Future'
    })
  }

  render() {
    return (
      <div style={{ margin: '20px'}}>

        <Dialog
          open={this.state.openSave}
          onClose={this.handleCloseSave}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Create Convention?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to create this Convention?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.saveConvention} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openEdit}
          onClose={this.handleCloseEdit}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Edit Convention?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to edit this Convention?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEdit} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.editConventionSave} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <h1>The Active Convention is: {this.props.info.ConventionName} </h1>
        {/* {JSON.stringify(this.state)} */}
        <hr></hr>
        <h3 onClick={() => this.addNewConventionForDemo()}>Create New Convention:</h3>
        <TextField
          id="standard-full-width"
          label="New Convention Name:"
          style={{ margin: 8 }}
          placeholder="Convention Name"
          fullWidth
          value={this.state.ConventionName}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={event => this.handleConventionName(event)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              value={this.state.ConventionStartTime || this.props.info.ConventionStartTime}
              InputLabelProps={{ shrink: this.state.ConventionStartTime }}
              margin="normal"
              id="date-picker-dialog"
              label="Convention Start Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.conventionStartDate(date)}
            />
            <KeyboardDatePicker
              value={this.state.ConventionEndTime || this.props.info.ConventionEndTime}
              InputLabelProps={{ shrink: this.state.ConventionEndTime }}
              margin="normal"
              id="date-picker-dialog"
              label="Convention End Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.conventionEndDate(date)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.user.authorization === 4 && (
          <ThemeProvider theme={theme}>
          <Button onClick={this.newConvention} variant="contained" color="primary">Set New Convention</Button>
          </ThemeProvider>
        )}
        <hr></hr>
        <h3>Edit Convention:</h3>
        <TextField
          value={this.props.info.ConventionName}
          id="standard-full-width"
          label="Edit Current Convention Name:"
          style={{ margin: 8 }}
          placeholder="Convention Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={event => this.updateName(event)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              value={this.props.info.ConventionStartTime}
              margin="normal"
              id="date-picker-dialog"
              label="Edit Convention Start Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.updateStartTime(date)}
            />
            <KeyboardDatePicker
              value={this.props.info.ConventionEndTime}
              margin="normal"
              id="date-picker-dialog"
              label=" Edit  Convention End Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.updateEndTime(date)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.user.authorization === 4 && (
          <Button onClick={this.editConvention} variant="contained" color="primary">Edit This Convention</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    info: reduxStore.ConventionsReducer,
    user: reduxStore.user
  };
};

export default withRouter(connect(mapStateToProps)(Conventions));
