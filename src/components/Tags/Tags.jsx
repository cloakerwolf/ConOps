import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//this deals with the color of the confirm buttons
const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 


class Tags extends Component {
    state = {
        columns: [
            { title: "TagID", field: "TagID" },
            { title: "TagName", field: "TagName" },
            { title: "Active Status", field: "TagIsActive", render: (rowData) => <p>{JSON.stringify(rowData.TagIsActive)}</p>}

        ],
        data: []
    };

    //calls these functions on page load
    componentDidMount() {
        this.fetchAllTags();
    };

    //sends a GET request to the saga to grab the tags
    fetchAllTags() {
        this.props.dispatch({
            type: 'FETCH_TAG_LIST'
        })
    }

    render() {
        return (
          <div style={{ marginTop: '60px' }}>
            <h1 style={{ textAlign: "center" }}>
              Current Convention: 2DCON 2020
            </h1>
            <h2 style={{ textAlign: "center" }}>Tags</h2>
            <div style={{ textAlign: "right", marginRight: "2%" }}>
             
            {this.props.reduxStore.user.authorization === 4 && (
                <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.history.push(`/createTag`)}
              >
                Create New Tag
              </Button>
                </ThemeProvider>
            )}           
            </div>
            {this.props.reduxStore.user.authorization === 4 ? (
              <MaterialTable
                title="Editable Example"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.TagsReducer}
                editable={{}}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      this.props.history.push(`/edittag/${rowData.TagID}`);
                    }
                  }
                ]}
              />
            ) : (
              <MaterialTable
                title="Editable Example"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.TagsReducer}
                editable={{}}
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
export default connect(mapStateToProps)(Tags);
