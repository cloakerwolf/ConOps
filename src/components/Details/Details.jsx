import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Details.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//changes the color where primary is used 
const theme = createMuiTheme({
  palette: {
    primary: {main: "#19375f"}
  }
});
// adds these styles to anything with a class name of root
const styles = {
  root: {
    margin: "15px"
  }
};

// makes the dialog boxes draggable
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class Details extends Component {
  state = {
    Badge: "None",
    openDelete: false,
    openCheckIn: false,
    openPaid: false,
    openCheckOutWalkIn: false,
    openCheckOut: false,
    openSave: false,
    id: {},
  };

  // on page load it gets all the attendees info 
  componentDidMount() {
    this.fetchAttendeeInformation();
  }

  // closes dialog box
  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  // closes dialog box
  handleClosePaid = () => {
    this.setState({ openPaid: false });
  };

  // closes dialog box
  handleCloseCheckIn = () => {
    this.setState({ openCheckIn: false });
  };

  // closes dialog box
  handleCloseCheckOutWalkIn = () => {
    this.setState({ openCheckOutWalkIn: false });
  };

  // closes dialog box
  handleCloseCheckOut = () => {
    this.setState({ openCheckOut: false });
  };

  // closes dialog box
  handleCloseSave = () => {
    this.setState({ openSave: false });
  };

  // closes dialog box
  handleClosePromptTwo = () => {
    this.setState({ openPromptTwo: false });
  };

  // opens dialog box
  handleOpenPromptTwo = () => {
    this.setState({ openPromptTwo: true });
  };

  // sends off id of the attendee you wish to delete
  deleteAttendee = () => {
    this.props.dispatch({
      type: "DELETE_ATTENDEE_INFO",
      payload: this.state.id
    });
    this.props.history.push(`/check-in`)
  }

  // checks in the attendee if they are a walk up
  handlePaid = () => {
    this.props.dispatch({
             type: "CHECK_IN_AND_PAY_ATTENDEE",
             payload: this.state.id
           });
    this.handleClosePaid();
    this.handleClosePromptTwo(); 
  }

  // checks in the attendee if they are not a walk up
  checkIn = () => {
    this.props.dispatch({
           type: "CHECK_IN_FROM_DETAILS",
           payload: [this.state.id]
         });
    this.handleCloseCheckIn();
  }

  //this function checks out the walk in attendee and removes there check in and payment date
  checkOutWalkIn = () => {
    this.props.dispatch({
      type: "CHECK_OUT_WALK_IN",
      payload: this.state.id
    });
    this.handleCloseCheckOutWalkIn();
  }

  // this function checkouts a normal attendee and just removes there checking time 
  checkOut = () => {
    this.props.dispatch({
      type: "CHECK_OUT",
      payload: this.state.id
    });
    this.handleCloseCheckOut();
  }

  // this function sends off the changes to be put into the database and over write the old data
  save = () => {
    this.props.dispatch({
      type: "UPDATE_ATTENDEE_INFO",
      payload: this.props.info
    });
    this.handleCloseSave();
  }

  // tells the app get the specific attendees information
  fetchAttendeeInformation = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'FETCH_ATTENDEE_PERSONAL_INFO',
      payload: id
    });

  }

  // changes the value of the badge
  handleChange = event => {
    this.setState({
      Badge: event.target.value
    });
  };

  // brings you back to the check in page
  handleBack = () => {
    this.props.history.push("/check-in");
  };

  // sends the order id to find everyone in that group and to a diffrent page
  handleFind = id => {
    // this.props.dispatch({
    //   type: "FETCH_ORDER_INFO",
    //   payload: id
    // });
    this.props.history.push(`/OrderID/${id}`);
  };

  // opens the delete dialog box
  handleDelete = id => {
    this.setState({
      openDelete: !this.state.openDelete,
      ...this.state.id, id: id
    })
};

// opens the check in payment dialog box
  handleCheckIn = (id, payment) => {
    if(payment){
      this.setState({
        openCheckIn: !this.state.openCheckIn,
        ...this.state.id, id: id
      });
      
    }else{
      this.setState({
        openPaid: !this.state.openPaid,
        ...this.state.id, id: id
      });
      
    }
    
  };

  // opens the checkout dialog box
  handleCheckOut = (id, order) => {
    if(order == null){
      this.setState({
        openCheckOutWalkIn: !this.state.openCheckOutWalkIn,
        ...this.state.id, id: id
      })
    } else {
      this.setState({
        openCheckOut: !this.state.openCheckOut,
        ...this.state.id, id: id
      })
    }
    
  };

  // opens the save dialog box
  handleSave = () => {
    this.setState({
      openSave: !this.state.openSave,
      ...this.state.info, info: this.props.info
    })
    
  };

  render() {
    return (
      <div className="detailsPage">
        <Dialog
          open={this.state.openDelete}
          onClose={this.handleCloseDelete}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Delete Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to delete this attendee?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.deleteAttendee} variant="contained" color="primary">
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
            Has Attendee Paid?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              This person must submit payment to be checked into the convention!
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePaid} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.handleOpenPromptTwo} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openPromptTwo}
          onClose={this.handleClosePromptTwo}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
        <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
          Check In
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: 'black' }}>
            Are you sure you want to check this attendee in!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClosePromptTwo} variant="contained" color="secondary">
            Cancel
          </Button>
          <ThemeProvider theme={theme}>
            <Button onClick={this.handlePaid} variant="contained" color="primary">
              Confirm
          </Button>
          </ThemeProvider>
        </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openCheckIn}
          onClose={this.handleCloseCheckIn}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Check-In Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to check-in this attendee?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCheckIn} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.checkIn} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openCheckOutWalkIn}
          onClose={this.handleCloseCheckOutWalkIn}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }}  id="draggable-dialog-title" className="Dialog">
            Check-Out Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you want to check this person OUT?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCheckOutWalkIn} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.checkOutWalkIn} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>


        <Dialog
          open={this.state.openCheckOut}
          onClose={this.handleCloseCheckOut}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }}  id="draggable-dialog-title" className="Dialog">
            Check-Out Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you want to check this person OUT?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCheckOut} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.checkOut} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openSave}
          onClose={this.handleCloseSave}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }}  id="draggable-dialog-title" className="Dialog">
            Edit Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Update this attendees info?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
              Cancel
          </Button>
            <ThemeProvider theme={theme}>
            <Button onClick={this.save} variant="contained" color="primary">
              Confirm
          </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <div>
          <h1> Manage Attendee: {this.props.info.FirstName}</h1>
          {/* needs to render the name of the attendee */}
          <h1> 2D Con 2020: Remaster</h1>
        </div>
        <div>
          {console.log("info is", this.props.info)}
          {this.props.info.orderID === null && <p>Walk-in</p>}
          {this.props.info.orderID != null && (
            <p>Find All Attendees With Order ID: {this.props.info.orderID} </p>
          )}
          {this.props.info.orderID === null && (
            <Button style={{margin: '10px'}}variant="contained" disabled>
              Find Group
            </Button>
          )}
          {this.props.info.orderID != null && (
            <ThemeProvider theme={theme}>
              <Button
              style={{ margin: '10px' }}
              variant="contained"
              color="primary"
              onClick={() => this.handleFind(this.props.info.orderID)}
            >
              Find Group
            </Button>
            </ThemeProvider>
          )}

          {(this.props.user.authorization === 4 || this.props.user.authorization === 1 ) && (this.props.info.CheckInDate === null ? (
            <ThemeProvider theme={theme}>
           <Button
              style={{ margin: '10px' }}
              variant="contained"
              color="primary"
              onClick={() =>
                this.handleCheckIn(
                  this.props.info.AttendeeID,
                  this.props.info.PaymentDate
                )
              }
            >
              Check-In
            </Button>
            </ThemeProvider>
          )
          :
          (
            <Button
              style={{ margin: '10px' }}
              variant="contained"
              color="secondary"
              onClick={() =>
                this.handleCheckOut(
                  this.props.info.AttendeeID,
                  this.props.info.orderID
                )
              }
            >
              Checkout!
            </Button>
          ))}

          {this.props.user.authorization === 4 && (
            <Button
              style={{ margin: '10px' }}
              variant="contained"
              color="secondary"
              onClick={() => this.handleDelete(this.props.info.AttendeeID)}
            >
              Delete
            </Button>
          )}

          {/*will conditionaly render if there a admin or not */}
        </div>
        <hr></hr>
        <div>
          <h2>Personal Info</h2>
          <TextField
            label="First Name"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.FirstName}}
            value={this.props.info.FirstName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_FIRST_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Middle Name"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.MiddleName }}
            value={this.props.info.MiddleName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_MIDDLE_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Last Name"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.LastName }}
            value={this.props.info.LastName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_LAST_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Street Name 1"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.AddressLineOne }}
            value={this.props.info.AddressLineOne}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_ADDRESS_ONE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Street Name 2"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.AddressLineTwo }}
            value={this.props.info.AddressLineTwo}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_ADDRESS_TWO",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="City"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.City }}
            value={this.props.info.City}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_CITY",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="State/Province"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.StateProvince}}
            value={this.props.info.StateProvince}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_STATE_PROVINCE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Zip/Postal Code"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.PostalCode}}
            value={this.props.info.PostalCode}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_POSTAL_CODE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Country"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.CountryID }}
            value={this.props.info.CountryID}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_COUNTRY_ID",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Contact Info</h2>
          <TextField
            label="Email Address"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.EmailAddress}}
            value={this.props.info.EmailAddress}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_EMAIL_ADDRESS",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Phone Number"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.PhoneNumber }}
            value={this.props.info.PhoneNumber}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_PHONE_NUMBER",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Badge Info</h2>
          <InputLabel>Badge Type</InputLabel>
          <Select
            value={this.state.Badge}
            onChange={event => this.handleChange(event)}
            className={this.props.classes.root}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value="YoungChild">Child (6 and under)</MenuItem>
            <MenuItem value="Child">Child (7 - 13)</MenuItem>
            <MenuItem value="Adult 14">Adult (14 - 20)</MenuItem>
            <MenuItem value="Adult 21">Adult (Over 21)</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Independent Developer">Independent Developer</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Sponsor">Sponsor</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="VIP">V.I.P.</MenuItem>
            <MenuItem value="Vendor">Vendor</MenuItem>
            <MenuItem value="Unidentified">Unidentified - identify DoB</MenuItem>
          </Select>
          <TextField
            label="Badge Number"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.BadgeNumber }}
            value={this.props.info.BadgeNumber}
          ></TextField>
          {/* no handle change or on change, CANT BE EDITED */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Date of Birth"
              className={this.props.classes.root}
              value={this.props.info.DateOfBirth}
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date =>
                this.props.dispatch({
                  type: "EDIT_DETAIL_DATE_OF_BIRTH",
                  payload: date
                })
              }
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Badge Name"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.BadgeName}}
            value={this.props.info.BadgeName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_BADGE_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Convention Info</h2>
          <h3>2D Con 2020: Remaster</h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                value={this.props.info.RegistrationDate}
                margin="normal"
                id="date-picker-dialog"
                label="Registration Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />{" "}
              {/*No on change this field cannot be edited*/}
              <KeyboardDatePicker
                value={this.props.info.CheckInDate}
                margin="normal"
                id="date-picker-dialog"
                label="Check-In Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                onChange={date =>
                  this.props.dispatch({
                    type: "EDIT_DETAIL_CHECK_IN_DATE",
                    payload: date
                  })
                }
              />
              <KeyboardDatePicker
                value={this.props.info.PaymentDate}
                margin="normal"
                id="date-picker-dialog"
                label="Payment Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
                onChange={date =>
                  this.props.dispatch({
                    type: "EDIT_DETAIL_PAYMENT_DATE",
                    payload: date
                  })
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <hr></hr>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={this.handleBack} style={{ margin: '10px' }}>
          Back
        </Button>
        </ThemeProvider>
        {(this.props.user.authorization === 4 || this.props.user.authorization === 1)
        &&(
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" onClick={this.handleSave} style={{ margin: '10px' }}>
          Save
        </Button>
          </ThemeProvider>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    info: reduxStore.AttendeeDetailsReducer,
    user: reduxStore.user
  };
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(Details))
);