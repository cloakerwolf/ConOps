import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import AttendeeDetailsSaga from './AttendeeDetailsSaga';
import AttendeesCheckInSaga from './AttendeesCheckInSaga';
import AttendeesOrderIdSaga from './AttendeesOrderIdSaga';
import ConventionsSaga from './ConventionsSaga';
import EventsSaga from './EventsSaga';
import eventDetailsSaga from './eventDetailsSaga';
import HomePageSaga from './HomePageSaga';
import LocationSaga from './LocationSaga';
import locationDetailsSaga from './locationDetailsSaga';

import TagsSaga from './TagsSaga';
import sponsorSaga from './sponsorSaga';
import sponsorDetailsSaga from './sponsorDetailsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    AttendeeDetailsSaga(),
    AttendeesCheckInSaga(),
    AttendeesOrderIdSaga(),
    ConventionsSaga(),
    EventsSaga(),
    eventDetailsSaga(),
    HomePageSaga(),
    LocationSaga(),
    locationDetailsSaga(),
    TagsSaga(),
    sponsorSaga(),
    sponsorDetailsSaga(),
  ]);
}
