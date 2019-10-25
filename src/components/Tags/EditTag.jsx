import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

class EditTag extends Component {
  state = {
    openSave: false,
    info: {}
  };

  //calls these functions on page load
  componentDidMount() {
    this.fetchTagInformation();
  }

  //closes the edit tag alert
  handleCloseSave = () => {
    this.setState({ openSave: false });
  };

  //holds the id passed over from the tags page then sends it to the get saga 
  fetchTagInformation = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: "FETCH_TAG_INFO",
      payload: id
    });
  };

  saveTag = () => {
    //replaces the state with the new inputs
    let edit = {
      TagID: this.props.info.TagID,
      TagName: this.props.info.TagName,
      TagIsActive: this.props.info.TagIsActive
    };
    //send the edit state back to the saga
    console.log("edit", edit);
    this.props.dispatch({
      type: "EDIT_TAG",
      payload: edit
    });
    this.handleCloseSave();
    //sends you back to Tags component
    this.props.history.push(`/tags`);
  };

  //opens the dialog alert asking if you are sure you want to edit the tag
  edit = event => {
    event.preventDefault();
    this.setState({
      openSave: !this.state.openSave,
      ...this.state.info,
      info: this.props.info
    });
  };

  //able to toggle the tag active or inactive then sends the information to the saga
  handleChange = () => {
    this.props.dispatch({
      type: "UPDATE_PROPERTY",
      payload: { key: "TagIsActive", newValue: !this.props.info.TagIsActive }
    });
  };

  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <Dialog
            open={this.state.openSave}
            onClose={this.handleCloseSave}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle
              style={{ cursor: "move", color: "white" }}
              id="draggable-dialog-title"
              className="Dialog"
            >
              Edit tag?
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "black" }}>
                Are you sure that you would like to edit this tag?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseSave}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <ThemeProvider theme={theme}>
                <Button
                  onClick={this.saveTag}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
              </ThemeProvider>
            </DialogActions>
          </Dialog>

          <h1>Rename your Tag!</h1>
          <form>
            <TextField
              label="Edit Tag"
              InputLabelProps={{ shrink: this.props.info.TagName }}
              value={this.props.info.TagName}
              onChange={event =>
                this.props.dispatch({
                  type: "UPDATE_PROPERTY",
                  payload: { key: "TagName", newValue: event.target.value }
                })
              }
            />
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={this.props.info.TagIsActive} />}
                label="Active"
                labelPlacement="start"
                onChange={this.handleChange}
              />
            </FormGroup>
          <hr></hr>

            <div style={{ marginTop: "3%" }}>
              <Button
                style={{ marginRight: "3%" }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.props.history.push(`/tags`);
                }}
              >
                Cancel
              </Button>
              {this.props.user.authorization === 4 && (
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.edit}
                  >
                    Save Changes
                  </Button>
                </ThemeProvider>
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}
const mapStateToProps = (reduxStore) => {
    return {
       info: reduxStore.TagDetailReducer,
       user: reduxStore.user
    }
}
export default connect(mapStateToProps)(EditTag);