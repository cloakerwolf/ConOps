import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    }
});

const styles = ({
    root: {
        margin: '15px',
    },
});

// adds dialog box to confirm a new location
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateSponsor extends Component {
    // dialog box is closed when the page loads, until select save
    state = {
        openSave: false,
    }

    // this will return you to the sponsor page if you click cancel while creating a new sponsor
    handleCancel = () => {
        this.props.history.push('/sponsors');
    }

    // this will close the dialog box when click cancel, confirm, or outside the dialog box
    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    // this triggers the dialog box to open when you click save
    handleSave = () => {
        this.setState({
            openSave: !this.state.openSave,
        })
    }

    // sends the new sponsor information to the database
    saveSponsor = () => {
        this.props.dispatch({
            type: "ADD_SPONSOR",
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push(`/sponsors`);
    }

    render() {
        return (
            <div style={{margin: '20px'}}>
            <Dialog
                open={this.state.openSave}
                onClose={this.handleCloseSave}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                    Create Sponsor?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: 'black' }}>
                        Are you sure that you would like to create this Sponsor?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.saveSponsor} variant="contained" color="primary">
                            Confirm
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>     
                <h1>Create Sponsor</h1>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_NAME",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Amount Paid"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_AMOUNT_PAID",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Website"
                    className={this.props.classes.root}
                    fullWidth
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_WEBSITE",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Notes"
                    className={this.props.classes.root}
                    fullWidth
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_NOTES",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <hr></hr>
                <Button onClick={this.handleCancel} variant="contained" color="secondary" style={{ margin: '5px' }}>Cancel</Button>
                {this.props.user.authorization === 4 && (
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.handleSave} variant="contained" color="primary" style={{margin:'5px'}}>Save</Button>
                    </ThemeProvider>
                )}
            </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.sponsorDetailsReducer,
        user: reduxStore.user
    };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateSponsor));