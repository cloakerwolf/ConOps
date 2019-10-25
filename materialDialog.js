
//we used the Draggable Dialog from this page
https://material-ui.com/components/dialogs/#alerts


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button';


//makes the dialog alerts draggable
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

state = {
    //if openSave is false the dialog alert will not show on the screen but when it is changed to true the dialog alert will render on the screen
    openSave: false,
    info: {}
};

//closes the edit tag alert
handleCloseSave = () => {
    this.setState({ openSave: false });
};

//opens the dialog alert asking if you are sure you want to edit the tag
edit = event => {
    event.preventDefault();
    this.setState({
        //toggles the openSave in the state from false to true and opens the dialog alert
        openSave: !this.state.openSave,
        ...this.state.info,
        info: this.props.info
    });
};

//this is the dialog alert that handles Editing tags
<Dialog
    //when openSave is false this Dialog does not open, when openSave changes to true then the dialog will open
    open={this.state.openSave}
    //this Dialog alert closes when the handleCloseSave function is activated
    onClose={this.handleCloseSave}
    //the PaperComponent is called allowing the user to drag the dialog alert around the page
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
>   
    //this is the section that appears at the top of the dialog box
    <DialogTitle
        style={{ cursor: "move", color: "white" }}
        id="draggable-dialog-title"
        className="Dialog"
    >
        Edit tag?
            </DialogTitle>
            //This appears in the body of the dialog alert (middle section)
    <DialogContent>
        <DialogContentText style={{ color: "black" }}>
            Are you sure that you would like to edit this tag?
              </DialogContentText>
    </DialogContent>
    //this is the bottom section of the dialog alert holds the buttons 
    <DialogActions>
        <Button
            //on click run the handleCloseSave function
            onClick={this.handleCloseSave}
            variant="contained"
            color="secondary"
        >
            Cancel
              </Button>
        <ThemeProvider theme={theme}>
            <Button
                //on click run the saveTag function 
                onClick={this.saveTag}
                variant="contained"
                color="primary"
            >
                Confirm
                </Button>
        </ThemeProvider>
    </DialogActions>
</Dialog>