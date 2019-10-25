import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from "@material-ui/pickers";
import moment from 'moment';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
// above are all of the imports, mostly from material ui. others of note: 
// react, connect from react-redux, date-fns for date standardization in the material date picker, moment to assist with display of dates/timestamps,
// pickers is a mui date/time picker utility, and draggable allows the alerts to be draggable.

// material ui theme for button styling
const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    }
});

// mui styling inline, rather than in app.css
const styles = ({
    root: {
        margin: '15px',
    },
    multiline: {
        margin: '0px',
        maxWidth: '80%'
    },
    helperText: {
        marginLeft: '15px'
    },
    cancelledText: {
        fontWeight: 'bold',
        color: 'red'
    },
    topRight: {
        marginRight: '0px'
    }
});

// dialogue component
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}


class EventDetails extends Component {
    // local state! the "opens" deal with whether a dialogue box is active or not (they start inactive)
    // details is used for making an event active or cancelled.
    state = {
        openSave: false,
        openAlert: false,
        openCancel: false,
        openActivate: false,
        details: {},
    }

    // things to load on mount. these fetch and populate all of the dropdowns: locations, tags, the convention itself for displaying convention name on page, and sponsors. then saves the actual event route so a refresh of the page doesn't lose all of the data
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_LOCATIONS'
        });
        this.props.dispatch({
            type: 'FETCH_TAG_LIST'
        });
        this.props.dispatch({
            type: 'FETCH_CONVENTION'
        });
        this.props.dispatch({
            type: 'FETCH_SPONSORS'
        });

        this.fetchEventDetails();
    }

    // functions for handling dialogs
    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    handleCloseAlert = () => {
        this.setState({ openAlert: false });
    };

    handleCloseCancel = () => {
        this.setState({ openCancel: false });
    };

    handleCloseActivate = () => {
        this.setState({ openActivate: false });
    };

    // for handling page route and preventing loss of data on refresh
    fetchEventDetails = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_EVENT_DETAILS',
            payload: id
        });
    }

    // back button goes back to main events page
    handleBack = () => {
        this.props.history.push("/events");
    };

    //saves any changes made to the event
    handleSave = () => {
        // console.log('clicked save!');
        // checks if event has any notes on what was modified, then proceeds to confirmation alerts. if notes are null or '', it prompts user to enter notes.
        // this will not check if notes have been updated, however. any notes already in an EventModifiedNotes will just be bypassed (no check if an additional change has been made)
        if (this.props.details.EventModifiedNotes === null || this.props.details.EventModifiedNotes === '') {
            this.setState({
                openAlert: !this.state.openAlert
            })
        } else {
            this.setState({
                openSave: !this.state.openSave,
                ...this.state.details, details: this.props.details
            })
        }
    }

    // save event, sends data in reducer to the server (via saga), closes the dialog box, and pushes you back to the events page.
    saveEvent = () => {
        this.props.dispatch({
            type: "UPDATE_EVENT_INFO",
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push("/events");
    }

    // cancels an event, but keeps it in the list.
    cancelEvent = () => {
        this.props.dispatch({
            type: "CANCEL_EVENT",
            payload: this.props.details.EventID
        });
        this.handleCloseCancel();
    }

    // activates a cancelled event.
    activateEvent = () => {
        this.props.dispatch({
            type: "UNCANCEL_EVENT",
            payload: this.props.details.EventID
        });
        this.handleCloseActivate();
    }

    // this is the function that runs when someone clicks on the tag's X button (see also: MUI Chips).  
    handleDeleteTag = (tag) => {
        // console.log('clicked on tag', tag);
        this.props.dispatch({
            type: 'REMOVE_TAG_FROM_EVENT',
            payload: tag
        })
    }


    render() {

        // this is for the dropdown of all of the locations. this is a map of all locations, but only pulling out locations listed as ACTIVE
        let locationsInSelector = this.props.locations.map((location) => {
            if (location.LocationIsActive === true) {
                return (
                    <MenuItem value={location.LocationID} key={location.LocationID}>{location.LocationName}</MenuItem>
                )
            } else {
                return false
            }
        });

        // this is for the display of tags on the tags on the page. These are the blue Chips (see MUI Chip). we arranged them in a small Grid.
        // label is what's shown on the page, value is what we're interested in sending to the database. although we are passing the whole tag object itself to the delete route.
        let eventTags = this.props.details.TagObjects.map((tag) => {
            return (
                <Grid item key={tag.TagID}>
                    <Chip
                        key={tag.TagID}
                        label={tag.TagName}
                        value={tag.TagID}
                        className={this.props.classes.chip}
                        onDelete={() => this.handleDeleteTag(tag)}
                        color="primary"
                    />
                </Grid>
            )
        })

        // this is for the dropdown of all of the tags. this is a map of all tags, but only pulling out tags listed as ACTIVE. value is full object because that is easiest to grab the id info we need.
        let allTags = this.props.tags.map((tag) => {
            if (tag.TagIsActive === true) {
                return (
                    <MenuItem value={tag} key={tag.TagID}>{tag.TagName}</MenuItem>
                )
            } else {
                return false
            }
        })

        // this is for the dropdown of all of the sponsors. this is a map of all sponsors, but only pulling out sponsors listed as ACTIVE
        let sponsorSelector = this.props.sponsors.map((sponsor) => {
            if (sponsor.SponsorIsActive === true) {
                return (
                    <MenuItem value={sponsor.SponsorID} key={sponsor.SponsorID}>{sponsor.SponsorName}</MenuItem>
                )
            } else {
                return false
            }
        })


        return (
            <div style={{ margin: '20px' }}>
                {/* dialog of whether the user wants to save their edits of the event itself */}
                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Edit Event?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to edit this Event?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.saveEvent} variant="contained" color="primary">
                                Confirm
                            </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>
                    {/* below is a dialog to check if change notes have been added */}
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
                            Please enter some notes of what you changed!
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
                    {/* below is to a dialog to confirm if a user wants to cancel an event */}
                <Dialog
                    open={this.state.openCancel}
                    onClose={this.handleCloseCancel}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Cancel Event?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to cancel this Event?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseCancel} variant="contained" color="secondary">
                            Back
                        </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.cancelEvent} variant="contained" color="primary">
                                Confirm
                            </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>
                    {/* below is a dialog to check if a user wants to re-activate a cancelled event */}
                <Dialog
                    open={this.state.openActivate}
                    onClose={this.handleCloseActivate}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Activate Event?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to activate this Event?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseActivate} variant="contained" color="secondary">
                            Back
                        </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.activateEvent} variant="contained" color="primary">
                                Confirm
                        </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>

                {/* {JSON.stringify(this.props.details)} */}

                <h1>{this.props.convention.ConventionName}</h1>
                {/* below is what displays if an event is cancelled; this is basically just conditional rendering the button and stating the event is cancelled */}
                {this.props.details.IsCancelled && <h3 className={this.props.classes.cancelledText}>Event is cancelled.</h3>}
                <h1> Manage Event: {this.props.details.EventName}</h1>
                {this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.setState({
                        openActivate: !this.state.openActivate,
                        ...this.state.details, details: this.props.details.EventId
                    })
                }}>
                    Make Active
                </Button>}
                {!this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.setState({
                        openCancel: !this.state.openCancel,
                        ...this.state.details, details: this.props.details.EventId
                    })
                }}>
                    Cancel Event
                </Button>}
                <div className={this.props.classes.topRight}>
                    {/* conditionally renders if an event has been modified and when it was last modified */}
                    {this.props.details.DateLastModified && <h3 className={this.props.classes.cancelledText}>Event Has Been Modified!</h3>}
                    {this.props.details.DateLastModified && <h4 className={this.props.classes.cancelledText}>{moment(this.props.details.DateLastModified).format('LLLL')}</h4>}
                    {/* a change notes text field */}
                    <TextField
                        label="Change Notes"
                        multiline
                        fullWidth
                        margin="normal"
                        className={this.props.classes.multiline}
                        value={this.props.details.EventModifiedNotes}
                        InputLabelProps={{ shrink: this.props.details.EventModifiedNotes }}
                        onChange={event =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_MODIFIED_NOTES",
                                payload: event.target.value
                            })}
                    />
                </div>
                <hr></hr>
                <h2>Event Details</h2>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    value={this.props.details.EventName}
                    InputLabelProps={{ shrink: this.props.details.EventName }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_NAME",
                            payload: event.target.value
                        })}
                />
                {/* MUI pickers is a component to help display the calendar and time; fomat sets how it displays on the DOM.  */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Start Time"
                        className={this.props.classes.root}
                        value={this.props.details.EventStartTime}
                        InputLabelProps={{ shrink: this.props.details.EventName }}
                        format="MM/dd/yyyy h:mm a"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_START_TIME",
                                payload: date
                            })
                        }
                    />
                    <KeyboardDateTimePicker
                        label="End Time"
                        className={this.props.classes.root}
                        value={this.props.details.EventEndTime}
                        InputLabelProps={{ shrink: this.props.details.EventName }}
                        format="MM/dd/yyyy h:mm a"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_END_TIME",
                                payload: date
                            })
                        }
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    label="Description"
                    multiline
                    fullWidth
                    margin="normal"
                    className={this.props.classes.multiline}
                    value={this.props.details.EventDescription}
                    InputLabelProps={{ shrink: this.props.details.EventDescription }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_DESCRIPTION",
                            payload: event.target.value
                        })}
                />
                <hr></hr>
                <h2>Location Details</h2>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Location</FormHelperText>
                    <Select
                        value={this.props.details.LocationID}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_LOCATION',
                                payload: event.target.value
                            })}
                    >
                        {locationsInSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <h2>Tag Details</h2>
                <Grid item container direction="row" spacing={2} justify="flex-start">
                    {eventTags}
                </Grid>
                {/* {JSON.stringify(this.props.details.TagObjects)} */}

                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Add Tags</FormHelperText>
                    <Select
                        value={this.props.tags}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_TAGS',
                                payload: event.target.value
                            })}
                    >
                        {allTags}
                    </Select>
                </FormControl>
                <hr></hr>
                <h2>Sponsor Info</h2>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Selected Sponsor</FormHelperText>
                    <Select
                        value={this.props.details.SponsorID}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_SPONSOR',
                                payload: event.target.value
                            })}
                    >
                        {sponsorSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <div>
                    <Button variant="contained" color="secondary" onClick={this.handleBack} style={{ margin: '5px' }}>
                        Back
                    </Button>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" onClick={this.handleSave} style={{ margin: '5px' }}>
                            Save
                    </Button>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer,
        tags: reduxStore.TagsReducer,
        convention: reduxStore.ConventionsReducer,
        sponsors: reduxStore.sponsorReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(EventDetails));