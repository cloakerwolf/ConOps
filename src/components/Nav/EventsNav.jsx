import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const styles = theme => ({
    root: {
        margin: '30px',
        color: 'white',
        font: 'Dosis',
        fontSize: '20px'
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
});

class EventsNav extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };

    handleClick = (propertyName, event) => {
        if (propertyName === 'events') {
            this.props.history.push('/events')
            this.setState({ open: false });
        } else if (propertyName === 'locations') {
            this.props.history.push('/locations')
            this.setState({ open: false });
        }
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div >

                <div>
                    <Button
                        className={classes.root}
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                    >
                        Events
          </Button>
                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem onClick={(event) => this.handleClick('events', event)}>EVENTS</MenuItem>
                                            <MenuItem onClick={(event) => this.handleClick('locations', event)}>LOCATIONS</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        );
    }
}

EventsNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EventsNav));
