import React, { Component }from 'react';
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
import { connect } from 'react-redux';

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

class AdminNav extends Component {
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
        if (propertyName === 'tags') {
            this.props.history.push('/tags')
            this.setState({ open: false});
        } else if (propertyName === 'conventions') {
            this.props.history.push('/conventions')
            this.setState({ open: false });
        } else if (propertyName === 'game-library') {
            this.props.history.push('/gamelibrary')
            this.setState({ open: false });
        } else if (propertyName === 'news') {
            this.props.history.push('/news')
            this.setState({ open: false });
        } else if (propertyName === 'sponsors') {
            this.props.history.push('/sponsors')
            this.setState({ open: false });
        }
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
          <div>
            <div>
              <Button
                className={classes.root}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                Admin
              </Button>
              <Popper
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList className="onTop">
                          <MenuItem
                            className="onTop"
                            onClick={event => this.handleClick("tags", event)}
                          >
                            TAGS
                          </MenuItem>
                          <MenuItem
                            className="onTop"
                            onClick={event =>
                              this.handleClick("conventions", event)
                            }
                          >
                            CONVENTIONS
                          </MenuItem>
                          <MenuItem
                            className="onTop"
                            onClick={event =>
                              this.handleClick("game-library", event)
                            }
                          >
                            GAME LIBRARY
                          </MenuItem>
                          <MenuItem
                            className="onTop"
                            onClick={event => this.handleClick("news", event)}
                          >
                            NEWS
                          </MenuItem>
                          <MenuItem
                            className="onTop"
                            onClick={event =>
                              this.handleClick("sponsors", event)
                            }
                          >
                            SPONSORS
                          </MenuItem>
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

AdminNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect()(AdminNav)));
