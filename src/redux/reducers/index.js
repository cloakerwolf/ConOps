import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';

import AttendeeDetailsReducer from './AttendeeDetailsReducer';
import AttendeesCheckInReducer from './AttendeesCheckInReducer';
import AttendeesOrderIdReducer from './AttendeesOrderIdReducer';
import ConventionsReducer from './ConventionsReducer';
import EventsReducer from './EventsReducer';
import eventDetailsReducer from './eventDetailsReducer';
import homePageReducer from './HomePageReducer';
import TagsReducer from './TagsReducer';
import TagDetailReducer from './TagDetailReducer';
import LocationReducer from './LocationReducer'
import locationDetailsReducer from './locationDetailsReducer';
import sponsorReducer from './sponsorReducer';
import sponsorDetailsReducer from './sponsorDetailsReducer'





// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  AttendeeDetailsReducer,
  AttendeesCheckInReducer,
  AttendeesOrderIdReducer,
  ConventionsReducer,
  EventsReducer,
  eventDetailsReducer,
  homePageReducer,
  TagsReducer,
  TagDetailReducer,
  LocationReducer,
  locationDetailsReducer,
  sponsorReducer,
  sponsorDetailsReducer,
});

export default rootReducer;
