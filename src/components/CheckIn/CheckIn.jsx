import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { isFlowBaseAnnotation } from "@babel/types";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//this deals with the color of the confirm buttons
const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

//makes the dialog alerts draggable
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class CheckIn extends Component {
  state = {
    columns: [
      { title: "First Name", field: "FirstName" },
      { title: "Last Name", field: "LastName" },
      { title: "Middle Name", field: "MiddleName" },
      { title: "Email Address", field: "EmailAddress" },
      { title: "Phone Number", field: "PhoneNumber" },
      { title: "Date Of Birth", field: "DateOfBirth", render: (rowData) => <p>{moment(rowData.DateOfBirth).format('MM-DD-YYYY')}</p> },
      { title: "Registration Date", field: "RegistrationDate", hidden: true },
      { title: "Check-In date", field: "CheckInDate", hidden: true },
      { title: "Payment Date", field: "PaymentDate", hidden: true },
      { title: "Badge Type ID", field: "BadgeTypeID", hidden: true },
      { title: "Badge Number", field: "BadgeNumber" },
      {
        title: "OrderID",
        field: "orderID"
      }
    ],
    open: false,
    openPaid: false,
    rowData: [],
    checkedIn: false,
    preRegistered: false,
    walkIn: false,
    all: true
  };

  //calls these functions on page load
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_CONVENTION'
    });
    this.fetchAllAttendees();
  }

  //Sends a GET request to saga
  fetchAllAttendees = () => {
    this.props.dispatch({
      type: "FETCH_ALL_ATTENDEES"
    });
  }

  //opens the payment check dialog alert
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //closes the payment check dialog alert
  handleClose = () => {
    this.setState({ open: false });
  };

  //opens the checkin dialog alert
  handleClickOpenPaid = () => {
    this.setState({ openPaid: true });
  };

  //closes the checkin dialog alert
  handleClosePaid = () => {
    this.setState({ openPaid: false });
  };

  //opens the alert that asks you if you want to checkin and pay for the attendee
  checkInPromptTwo = () => {
    this.setState({ openTwo: true });
  };

  //closes the alert that asks you if you want to checkin and pay for the attendee
  handleClosePromptTwo = () => {
    this.setState({ openTwo: false });
  };

  //this sends the PUT to the saga for checking in and paying for an attendee
  paymentCheckInPrompt = () => {
    this.props.dispatch({
      type: "CHECK_IN_AND_PAY_ATTENDEE",
      payload: this.state.rowData
      });
      this.handleClosePromptTwo()
      this.handleClose()
  }

  //this sends the PUT to the saga for checking in an attendee
  checkInPrompt = () => {
    //console.log('this is the check in only', this.state.rowData);
    
    this.props.dispatch({
      type: "CHECK_IN_ALL_SELECTED",
      payload: this.state.rowData
      });
      this.handleClosePaid()
  }

  render() {
    return (
      <div style={{marginTop: '60px'}}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Payment Check
        </DialogTitle>
          <DialogContent >
            <DialogContentText style={{color: 'black'}} >
              This person must submit payment to be checked into the convention!
          </DialogContentText>
          </DialogContent>
          <DialogActions >
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.checkInPromptTwo} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openTwo}
          onClose={this.handleClosePromptTwo}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Check In
        </DialogTitle>
          <DialogContent >
            <DialogContentText style={{ color: 'black' }} >
            Are you sure you wanna check this person in!
          </DialogContentText>
          </DialogContent>
          <DialogActions >
            <Button onClick={this.handleClosePromptTwo} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
              <Button onClick={this.paymentCheckInPrompt} variant="contained" color="primary">
                Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openPaid}
          onClose={this.handleClosePaid}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Check-In
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to check this person in?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePaid} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.checkInPrompt} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>
        <h1 style={{ textAlign: "center" }}>Current Convention: {this.props.convention.ConventionName}</h1>
        <p style={{ textAlign: "center" }}>FILTER</p>
        <div style={{ textAlign: "center" }}>
          {this.state.checkedIn ?
            <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_CHECKED_IN_ATTENDEES"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            CHECKED-IN
          </Button>
            </ThemeProvider>
          :
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_CHECKED_IN_ATTENDEES"
              });
              this.setState({
                ...this.state,
                checkedIn: !this.state.checkedIn,
                preRegistered: false,
                walkIn: false,
                all: false
              })
            }}
            color="inherit"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            CHECKED-IN
          </Button>}
            {this.state.preRegistered ?
            <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_PRE-REGISTERED_ATTENDEES"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            PRE-REGISTERED
          </Button>
            </ThemeProvider>
          :
            <Button
              variant="contained"
              onClick={() => {
                this.props.dispatch({
                  type: "FETCH_PRE-REGISTERED_ATTENDEES"
                });
                this.setState({
                  ...this.state,
                  checkedIn: false,
                  preRegistered: !this.state.preRegistered,
                  walkIn: false,
                  all: false
                })
              }}
              color="inherit"
              style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
            >
              PRE-REGISTERED
          </Button>}
              {this.state.walkIn ?
            <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_WALK_INS"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            WALK-IN
          </Button>
            </ThemeProvider>
          :
            <Button
              variant="contained"
              onClick={() => {
                this.props.dispatch({
                  type: "FETCH_WALK_INS"
                });
                this.setState({
                  ...this.state,
                  checkedIn: false,
                  preRegistered: false,
                  walkIn: !this.state.walkIn,
                  all: false
                })
              }}
              color="inherit"
              style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
            >
              WALK-IN
          </Button>}
              {this.state.all ?
            <ThemeProvider theme={theme}>
          <Button
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_ALL_ATTENDEES"
              });
            }}
            variant="contained"
            color= "primary"
            style={{ paddingLeft: "6%", paddingRight: "6%" }}
          >
            ALL
          </Button>
            </ThemeProvider>
          :
            <Button
              onClick={() => {
                this.props.dispatch({
                  type: "FETCH_ALL_ATTENDEES"
                });
                this.setState({
                  ...this.state,
                  checkedIn: false,
                  preRegistered: false,
                  walkIn: false,
                  all: !this.state.all
                })
              }}
              variant="contained"
              color="inherit"
              style={{ paddingLeft: "6%", paddingRight: "6%" }}
            >
              ALL
          </Button>}
        </div>
        {(this.props.reduxStore.user.authorization == 4 ||
          this.props.reduxStore.user.authorization == 1)
          && (
            <MaterialTable
              title="Editable Example"
              columns={this.state.columns}
              options={{
                columnsButton: true,
                // headerStyle: { backgroundColor: 'blue', color: 'white' },
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                toolbarButtonAlignment: "right",
                searchFieldAlignment: "left",
                showTitle: false
              }}
              data={this.props.reduxStore.AttendeesCheckInReducer}
              actions={[
                {
                  icon: "accessibility",
                  tooltip: "Find this person`s personal info",
                  onClick: (event, rowData) => {
                    this.props.history.push(`/details/${rowData.AttendeeID}`);
                  }
                },
                rowData => ({
                  icon: "group",
                  tooltip: "Find all members of this group",
                  onClick: (event, rowData) => {
                    console.log(rowData.orderID);
                    this.props.history.push(`/OrderID/${rowData.orderID}`);
                  },
                  disabled: rowData.orderID == null
                }),
                rowData => ({
                  icon: "check_circle",
                  tooltip: "check this Attendee in!",
                   onClick:  (event, rowData) => {
                        if(rowData.PaymentDate) {
                          this.setState({
                            openPaid: !this.state.openPaid,
                            ...this.state.rowData, rowData: [rowData.AttendeeID]
                          })
                        } else {
                          this.setState({
                            open: !this.state.open,
                            ...this.state.rowData, rowData: rowData.AttendeeID
                          })
                        }
                      },
                   disabled: rowData.CheckInDate !== null
                  })
              ]}
              editable={{}}
            />
          )}
        {this.props.reduxStore.user.authorization !== 4 &&
          this.props.reduxStore.user.authorization !== 1 && (
            <MaterialTable
              title="Editable Example"
              columns={this.state.columns}
              options={{
                columnsButton: true,
                // headerStyle: { backgroundColor: 'blue', color: 'white' },
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                toolbarButtonAlignment: "right",
                searchFieldAlignment: "left",
                showTitle: false
              }}
              data={this.props.reduxStore.AttendeesCheckInReducer}
              actions={[
                {
                  icon: "accessibility",
                  tooltip: "Find this person`s personal info",
                  onClick: (event, rowData) => {
                    this.props.history.push(`/details/${rowData.AttendeeID}`);
                  }
                },
                rowData => ({
                  icon: "group",
                  tooltip: "Find all members of this group",
                  onClick: (event, rowData) => {
                    console.log(rowData.orderID);
                    this.props.history.push(`/OrderID/${rowData.orderID}`);
                  },
                  disabled: rowData.orderID == null
                }),
              ]}
              editable={{}}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore,
    convention: reduxStore.ConventionsReducer,
  };
};
export default connect(mapStateToProps)(CheckIn);
