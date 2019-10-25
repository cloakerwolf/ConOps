import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    }
});


const styles = ({
    root: {
        margin: '15px',
    },
    fab: {
        margin: '15px',
        marginRight: '15px',
    } 
});

// adds dialog box to confirm sponsor details edit
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class SponsorDetails extends Component {
    // calls the fucntion to get all the sponsor details on page load
    componentDidMount() {
        this.fetchSponsorDetails();
    }

    // fetches all the sponsor details for the selected sponsor
    fetchSponsorDetails = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_SPONSOR_DETAILS',
            payload: id
        });
    }

    state = {
        SponsorIsActive: true,
        openSave: false,
        details: {},
    }

    // this will close the dialog box on click cancel, confirm, or outside the dialog box
    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    // this will return you to the location page if you click cancel while creating a new sponsor 
    handleBack = () => {
        this.props.history.push("/sponsors");
    };

    // this triggers the dialog box to open, and sets local state to the modified details
    handleSave = () => {
        this.setState({
            openSave: !this.state.openSave,
            ...this.state.details, details: this.props.details
        })
    };

    // this sends the updated information to the database  
    saveSponsor = () => {
        this.props.dispatch({
            type: "UPDATE_SPONSOR_DETAILS",
            payload: this.props.details
        });
        this.handleCloseSave();
    }

    // send active status to the database
    handleChange = () => {
        this.props.dispatch({
            type: "EDIT_SPONSOR_STATUS",
            payload: !this.props.details.SponsorIsActive
        })
    }

    render() {
        console.log('SPONSOR NAME:', this.props.details.SponsorName)
        return (
            <div style={{margin: '20px'}}>

                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Edit Sponsor?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to edit this sponsor?
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

                <h1>2D Con 2020: Remaster</h1>
                <h1>Manage Sponsor: {this.props.details.SponsorName}</h1>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    value={this.props.details.SponsorName}
                    InputLabelProps={{ shrink: this.props.details.SponsorName}}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_NAME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Amount Paid"
                    className={this.props.classes.root}
                    value={this.props.details.AmountPaid}
                    InputLabelProps={{ shrink: this.props.details.AmountPaid }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_AMOUNT_PAID",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Website"
                    className={this.props.classes.root}
                    value={this.props.details.Website}
                    InputLabelProps={{ shrink: this.props.details.Website }}
                    fullWidth
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_WEBSITE",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Notes"
                    className={this.props.classes.root}
                    value={this.props.details.Notes}
                    InputLabelProps={{ shrink: this.props.details.Notes }}
                    fullWidth
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_NOTES",
                            payload: event.target.value
                        })}
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.details.SponsorIsActive}
                            />}
                        label="Active"
                        labelPlacement="start"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <hr></hr>
                <Button onClick={this.handleBack} variant="contained" color="secondary" style={{margin: '5px'}}>Back</Button>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.handleSave} variant="contained" color="primary" style={{ margin: '5px' }}>Save</Button>
                </ThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.sponsorDetailsReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(SponsorDetails));
