import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';


//this component is for displaying all attendees under a single order ID

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class OrderID extends Component {
  //table for columns in order table
  state = {
    columns: [
      { title: "AttendeeID", field: "AttendeeID", hidden: true },
      { title: "ConventionID", field: "ConventionID", hidden: true },
      { title: "First Name", field: "FirstName" },
      { title: "Last Name", field: "LastName" },
      { title: "Middle Name", field: "MiddleName", hidden: true },
      { title: "Address Line One", field: "AddressLineOne", hidden: true },
      { title: "Address Line Two", field: "AddressLineTwo", hidden: true },
      { title: "City", field: "City", hidden: true },
      { title: "State/Province", field: "StateProvince", hidden: true },
      { title: "Postal Code", field: "PostalCode", hidden: true },
      { title: "CountryID", field: "CountryID", hidden: true },
      { title: "Email Address", field: "EmailAddress" },
      { title: "Phone Number", field: "PhoneNumber" },
      { title: "Date Of Birth", field: "DateOfBirth" },
      { title: "Badge Name", field: "BadgeName" },
      { title: "Registration Date", field: "RegistrationDate", hidden: true },
      { title: "Check-In date", field: "CheckInDate", hidden: true },
      { title: "Payment Date", field: "PaymentDate", hidden: true },
      { title: "Badge Type ID", field: "BadgeTypeID", hidden: true },
      { title: "Badge Number", field: "BadgeNumber" },
      { title: "Printed", field: "Printed", hidden: true },
      { title: "Discord Verified", field: "DiscordVerified", hidden: true },
      { title: "Pre Reg Sort Number", field: "PreRegSortNumber", hidden: true },
      { title: "OrderID", field: "OrderID" }
    ],
    data: [],
    open: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_CONVENTION'
    });
    this.fetchOrderInformation();
  }


  fetchOrderInformation = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'FETCH_ORDER_INFO',
      payload: id
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  checkInPrompt = () => {
    this.props.dispatch({
      type: "CHECK_IN_ALL_SELECTED",
      payload: this.state.data
    });
    this.handleClose();
    this.props.history.push(`/check-in`);
  }

  render() {
    return (
      <div style={{marginTop:'100px'}}>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
            Check-In
        </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Are you sure that you would like to check these people in?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Cancel
          </Button>
            <Button onClick={this.checkInPrompt} variant="contained" color="inherit">
              Confirm
          </Button>
          </DialogActions>
        </Dialog>

        <h1 style={{ textAlign: "center" }}>Current Convention: {this.props.convention.ConventionName}</h1>
        {this.props.reduxStore.user.authorization === 4 ||
        this.props.reduxStore.user.authorization === 1 ? (
          <MaterialTable className = "under"
            title="Editable Example"
            columns={this.state.columns}
            options={{
              columnsButton: true,
              selection: true,
              selectionProps: rowData => ({
                disabled: rowData.CheckInDate !== null
              }),
              // headerStyle: { backgroundColor: 'blue', color: 'white' },
              pageSizeOptions: [10, 20, 50],
              toolbarButtonAlignment: "right",
              searchFieldAlignment: "left",
              showTitle: false
            }}
            // onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
            data={this.props.reduxStore.AttendeesOrderIdReducer}
            actions={[
              {
                icon: "check_circle",
                tooltip: "Check in all of the selected attendees",
                onClick: (event, data) => {
                  if(data) {
                    let attendeesToCheckIn = [];
                    for (let i = 0; i < data.length; i++) {
                      console.log("i am in the loop");
                      attendeesToCheckIn.push(data[i].AttendeeID);
                    }
                    this.setState({
                      open: !this.state.open,
                      ...this.state.data, data: attendeesToCheckIn
                    })
                  }
                }
               
              }
            ]}
            editable={{}}
          />
        ) : (
          <MaterialTable className ="under"
            title="Editable Example"
            columns={this.state.columns}
            options={{
              columnsButton: true,
              // headerStyle: { backgroundColor: 'blue', color: 'white' },
              pageSizeOptions: [10, 20, 50],
              toolbarButtonAlignment: "right",
              searchFieldAlignment: "left",
              showTitle: false
            }}
           
            data={this.props.reduxStore.AttendeesOrderIdReducer}
            editable={{}}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "3%", marginTop: '10px' }}
          onClick={() => this.props.history.push("/check-in")}
        >
          Back to Check In
        </Button>
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
export default connect(mapStateToProps)(OrderID);
