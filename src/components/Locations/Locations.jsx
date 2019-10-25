import React, { Component  } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

const styles = ({
    fab: {
        margin: '15px',
        marginRight: '0px',
    }
});

class Locations extends Component {
    // fetches all the locations in the database when the page loads
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    // when you click the plus icon it takes you to the create location page
    handleClick = () => {
        this.props.history.push('/locations/create')
    }

    // this is how the information is passed into the material-ui table, search this: columns={this.state.columns}, data={this.props.reduxStore.LocationReducer}
    state = {
        columns:  [
            { title: "LocationID", field: "LocationID", hidden: true},
            { title: "Location Name", field: "LocationName", hidden: false },
            { title: "Location Description", field: "LocationDescription", hidden: false},
            { title: "Active Status", field: "LocationIsActive", hidden: false, render: (rowData) => <p>{JSON.stringify(rowData.LocationIsActive)}</p>},
        ], 
    }

    render() {
        return (
          <div>
            <h1 style={{textAlign:'center'}}>Locations</h1>
            {this.props.reduxStore.user.authorization === 4 && (
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
            {this.props.reduxStore.user.authorization === 4 && (
              <MaterialTable
                title="Locations"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
              // 
                data={this.props.reduxStore.LocationReducer}
                editable={{}}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Edit Location",
                    onClick: (event, rowData) => {
                      this.props.history.push(`/location/details/${rowData.LocationID}`);
                    }
                  }
                ]}
              />
            )}
            {this.props.reduxStore.user.authorization !== 4 && (
            // see README for details on the MaterialTable
              <MaterialTable
                title="Locations"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
              // this gets the information the reducer to put into local state
                data={this.props.reduxStore.LocationReducer}
              />
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
export default withStyles(styles)(connect(mapStateToProps)(Locations));