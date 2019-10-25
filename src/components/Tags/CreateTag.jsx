import React, { Component } from 'react';
import { connect } from 'react-redux';
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

//this deals with the color of the confirm buttons
const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
});

// this give the dialog box the ability to be moved around the page
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}


class CreateTag extends Component {


    state={
        openSave: false,
        openAlert: false,
        TagName: ''
    }
  //when this is called it closes the dialog alert for making a tag
  handleCloseSave = () => {
    this.setState({ openSave: false });
  };
  //when this is closed it closes the dialog alert saying you are missing information
  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  //this sends the data for the tag you just created to the saga then closes the dialog and sends you back to the tags page
  saveTag = () => {
    this.props.dispatch({
      type: 'CREATE_TAG',
      payload: { TagName: this.state.TagName }
    });
    this.handleCloseSave();
    //sends you back to Tags
    this.props.history.push(`/tags`)
  }

    //if TagName is empty then the missing information alert pops up. otherwise the alert asking if you want to create a new tag will pop up
    createTag = (event) => {
      if(this.state.TagName === ''){
        this.setState({
          openAlert: !this.state.openAlert,
        })
      } else {
        event.preventDefault();
        this.setState({
          openSave: !this.state.openSave,
        })
      }
        
    }


    render() {

        return (
          <>
            <div style={{ textAlign: "center" }}>
              {/*Alert asking if you want to create a new tag */}
              <Dialog
                open={this.state.openSave}
                onClose={this.handleCloseSave}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                  Create Tag?
        </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: 'black' }}>
                    Are you sure that you would like to create this Tag?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
                    Cancel
          </Button>
                  <ThemeProvider theme={theme}>
                  <Button onClick={this.saveTag} variant="contained" color="primary">
                    Confirm
          </Button>
                  </ThemeProvider>
                </DialogActions>
              </Dialog>
              {/*Alert telling you that you are missing information in the input field */}
              <Dialog
                open={this.state.openAlert}
                onClose={this.handleCloseAlert}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                  Missing Information?
        </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: 'black' }}>
                    Please make sure tag name is filled out!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <ThemeProvider theme={theme}>
                    <Button onClick={this.handleCloseAlert} variant="contained" color="primary">
                      Confirm
          </Button>
                  </ThemeProvider>
                </DialogActions>
              </Dialog>


              <h1>Create your Tag!</h1>
              <form>
                <TextField
                  label="TagName"
                  onChange={event =>
                    this.setState({
                      ...this.state,
                      TagName: event.target.value
                    })
                  }
                />
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
                      onClick={this.createTag}
                    >
                      Save Tag
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
export default connect(mapStateToProps)(CreateTag);