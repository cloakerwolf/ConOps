import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// mui styles and theme.. these could likely be combined. they were likely added/edited at same time, hence doubling up of same idea.
const styles = ({
    root: {
        margin: '15px',
    },
});

const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    },
    multiline: {
        margin: '0px',
        maxWidth: '80%'
    },
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateEvent extends Component {

    // component mount loads: clears event details (since we create in the same reducer), fetches all locations, tags, current convention, and sponsors
    componentDidMount() {
        this.props.dispatch({ 
            type: 'CLEAR_EVENT_DETAILS' 
        });
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
    }

    // if cancel is clicked, navigates user back to events page.
    handleCancel = () => {
        this.props.history.push('/events');
    }

    state = {
            LocationID: '',
            TagID: [],
            SponsorID: '',
            openSave: false,
            openAlert: false,
    }

    // closes the save dialog box
    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    // closes the alert dialog box
    handleCloseAlert = () => {
        this.setState({ openAlert: false });
    };

    // handler for changing the selected location
    handleLocationChange = (event) => {
        // console.log('SELECTED LOCATION:', event.target.value)
        this.setState({ LocationID: event.target.value })    
        this.props.dispatch({
            type: 'CREATE_EVENT_LOCATION',
            payload: event.target.value
        })
    }

    // handler for changing the selected tags. will only select one at a time, but display whatever has been selected
    handleTagChange = (event) => {
        // console.log('SELECTED TAG(S):', event.target.value)
        this.setState({ TagID: event.target.value })
        this.props.dispatch({
            type: 'CREATE_EVENT_TAGS',
            payload: event.target.value
        })
    }

    // handler for changing the selected sponsor
    handleSponsorChange = (event) => {
        // console.log('SELECTED SPONSOR:', event.target.value)
        this.setState({ SponsorID: event.target.value })
        this.props.dispatch({
            type: 'CREATE_EVENT_SPONSOR',
            payload: event.target.value
        })
    }

    // handler function to check if any critical details are missing: event name, description, start time, and end time. if all have data, proceed to the save function 
    handleSave = () => {
        if(this.props.details.EventName === null ||
            this.props.details.EventName === '' ||
            this.props.details.EventDescription === null ||
            this.props.details.EventDescription === '' ||
            this.props.details.EventStartTime === null ||
            this.props.details.EventStartTime === '' ||
            this.props.details.EventEndTime === null ||
            this.props.details.EventEndTime === ''
            ){
                this.setState({
                    openAlert: !this.state.openAlert,
                })
            } else {
            this.setState({
                openSave: !this.state.openSave,
            })
            }
    }

    // dispatches the event details to the server (via the saga), closes dialog box, and pushes user to events page
    saveEvent = () => {
        this.props.dispatch({
            type: 'ADD_EVENT',
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push(`/events`);
    }

    // this was dummy data for an event creation during live demo.
    // createYogaEventForDemo = () => {
    //     this.props.dispatch({
    //         type: 'ADD_YOGA_EVENT_FOR_DEMO'
    //     })
    // }


    render() {

        // maps through locations in reducer and only displays locations that are set as active
        let locationsInSelector = this.props.locations.map((location) => {
            if (location.LocationIsActive === true) {
                return (
                    <MenuItem value={location.LocationID} key={location.LocationID}>{location.LocationName}</MenuItem>
                )
            } else {
                return false
            }
            
        });

        // maps through tags in reducer and should display tags selected. this was not functioning as intended in final version. needs to be looked into (should appear as the blue tags as in the edit events page)
        let eventTags = this.props.details.Tags.map((tag) => {
            return (
                <Grid item key={tag}>
                    <Chip
                        key={tag}
                        label={tag}
                        className={this.props.classes.chip}
                        color="primary"
                    />
                </Grid>
            )
        });

        // maps through tags in reducer and only displays tags that are set as active
        let allTags = this.props.tags.map((tag) => {
            if (tag.TagIsActive === true) {
                return (
                    <MenuItem value={tag} key={tag.TagID}>{tag.TagName}</MenuItem>
                )
            } else {
                return false
            }
        });

        // maps through sponsors in reducer and only displays sponsors that are set as active
        let sponsorsInSelector = this.props.sponsors.map((sponsor) => {
            if (sponsor.SponsorIsActive === true) {
                return (
                    <MenuItem value={sponsor.SponsorID} key={sponsor.SponsorID}>{sponsor.SponsorName}</MenuItem>
                )
            } else {
                return false
            }
            
        });

        return (
            <div style={{margin: '20px'}}>
                {/* dialog box for confirming creation of event */}
                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Create Event?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to create this Event?
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
                    {/* dialog to check on critical fields that need to have data: name, description, event start and end times */}
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
                            Please make sure event name, description, start time, and endtime are filled out!
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

                <h1 onClick={() => this.createYogaEventForDemo()}>Create Event</h1>
                {/* {JSON.stringify(this.state)} */}
                <hr></hr>
                <TextField
                    label="Name"
                    value={this.props.details.EventName}
                    className={this.props.classes.root}
                    helperText="Required"
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_EVENT_NAME",
                            payload: event.target.value
                        })}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Start Time"
                        value={this.props.details.EventStartTime || this.props.conventions.ConventionStartTime}
                        className={this.props.classes.root}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        helperText="Required"
                        onChange={date =>
                            this.props.dispatch({
                                type: "CREATE_EVENT_START_TIME",
                                payload: date
                            })
                        }
                    />
                    <KeyboardDateTimePicker
                        label="End Time"
                        value={this.props.details.EventEndTime || this.props.conventions.ConventionEndTime}
                        className={this.props.classes.root}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        helperText="Required"
                        onChange={date =>
                            this.props.dispatch({
                                type: "CREATE_EVENT_END_TIME",
                                payload: date
                            })
                        }
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    margin="normal"
                    className={this.props.classes.multiline}
                    value={this.props.details.EventDescription}
                    helperText="Required"
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_EVENT_DESCRIPTION",
                            payload: event.target.value
                        })}
                />
                <hr></hr>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Location</FormHelperText>
                <Select
                    value={this.state.LocationID}
                    className={this.props.classes.root}
                    onChange={(event) => this.handleLocationChange(event)}
                >
                    {locationsInSelector}
                </Select>
                </FormControl>
                <hr></hr>
                <Grid item container direction="row" spacing={2} justify="flex-start">
                    {eventTags}
                </Grid>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Add Tags</FormHelperText>
                    <Select
                        multiple
                        value={this.state.TagID}
                        className={this.props.classes.root}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={value.TagName} />
                                ))}
                            </div>
                        )}
                        onChange={(event) => this.handleTagChange(event)}
                    >
                        {allTags}
                    </Select>
                </FormControl>
                <hr></hr>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Sponsor</FormHelperText>
                    <Select
                        value={this.state.SponsorID}
                        className={this.props.classes.root}
                        onChange={(event) => this.handleSponsorChange(event)}
                    >
                        {sponsorsInSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <Button onClick={this.handleCancel} variant="contained" color="secondary" style={{margin: '5px'}}>Cancel</Button>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.handleSave} variant="contained" color="primary" style={{ margin: '5px' }}>Save</Button>
                </ThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer,
        tags: reduxStore.TagsReducer,
        sponsors: reduxStore.sponsorReducer,
        conventions: reduxStore.ConventionsReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateEvent));