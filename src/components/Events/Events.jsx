import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// mui theme for button
const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
});

// mui styles
const styles = ({
  root: {
    margin: '15px',
  },
  fab: {
    margin: '15px',
    marginRight: '0px',
  }
});

class Events extends Component {

  // fetches event list, locations list, and clears event details on load (so no old data is stuck in the details, if you are switching between edits)
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
    this.props.dispatch({ type: 'FETCH_LOCATIONS' });
    this.props.dispatch({ type: 'CLEAR_EVENT_DETAILS' })
  }

  // local state for the table. title is title listed on DOM, field is what key in the reducer (which is ultimately the column in the database)
  // hidden dictates whether the column is shown on load, render is a way to morph the Material Table data into something useable. in this instance,
  // we used moment.js to format the event start times into readable timestamps, rather than gross looking database strings.
  // we were unable to figure out a way to morph the Tags data into anything other than an array that has been stringified.. Need more time to figure out how that is being rendered.
  // ideally we'd render the tags as MUI Chips, but we were unsuccessful in doing so.
  state = {
    columns: [
      { title: "EventID", field: "EventID", hidden: true },
      { title: "ConventionID", field: "ConventionID", hidden: true },
      { title: "Event", field: "EventName", hidden: false },
      { title: "Start Time", field: "EventStartTime", hidden: false, render: (rowData) => <p>{moment(rowData.EventStartTime).format('llll')}</p> },
      { title: "End Time", field: "EventEndTime", hidden: false, render: (rowData) => <p>{moment(rowData.EventEndTime).format('llll')}</p> },
      { title: "Description", field: "EventDescription", hidden: false },
      { title: "Location", field: "LocationName", hidden: false },
      { title: "Location Description", field: "LocationDescription", hidden: true },
      { title: "Cancelled", field: "IsCancelled", hidden: true, render: (rowData) => <p>{JSON.stringify(rowData.IsCancelled)}</p> },
      { title: "Sponsor", field: "SponsorName", hidden: false },
      { title: "Date Created", field: "DateCreated", hidden: true },
      { title: "Date Modified", field: "DatetLastModified", hidden: true },
      { title: "Notes", field: "EventModifiedNotes", hidden: true },
      {
        title: "Tags", field: "Tags", hidden: false, render: (rowData) =>
          <p>{rowData.Tags} </p>
      },
    ],
    data: []
  }

  // the only button on the page, creates a new event. pushes the user to that page.
  handleClick = () => {
    this.props.history.push('/events/create')
  }

  render() {
    return (

      <div>
        <h1 style={{ textAlign: 'center' }}>Events</h1>
        {/* conditionally render the create event button if they have the correct access level */}
        {(this.props.reduxStore.user.authorization === 4 ||
          this.props.reduxStore.user.authorization === 2) && (
            <ThemeProvider theme={theme}>
              <Fab
                color="primary"
                aria-label="add"
                className={this.props.classes.fab}
                onClick={this.handleClick}
              >
                <AddIcon />
              </Fab>
            </ThemeProvider>
          )}
        {/* conditionally render a table that allows a user to edit an event if they have authorization (admin and event organizer) */}
        {this.props.reduxStore.user.authorization === 4 ||
          this.props.reduxStore.user.authorization === 2 ? (
            <MaterialTable
              title="Events"
              columns={this.state.columns}
              options={{
                columnsButton: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                toolbarButtonAlignment: "right",
                searchFieldAlignment: "left",
                showTitle: false
              }}
              data={this.props.reduxStore.EventsReducer}
              actions={[
                {
                  icon: "event",
                  tooltip: "Edit Event",
                  onClick: (event, rowData) => {
                    this.props.history.push(
                      `/eventdetails/${rowData.EventID}`
                    );
                  }
                }
              ]}
              editable={{}}
            />
          ) : (
            // table for non-admins and event organizers. doesn't render an action button to take the user to the event edit page.
            <div className="eventsForNonAdmins">
              <MaterialTable
                title="Events"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.EventsReducer}
                editable={{}}
                className="eventsForNonAdmins"
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Events));