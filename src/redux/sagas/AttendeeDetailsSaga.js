import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetches the attendees info
function* fetchAttendeePersonalInfo(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //logging to make sure we're getting ID from click
        yield console.log('in fetchAttendeePersonalInfo:', action.payload);
        const response = yield axios.get(`/api/attendee/details/${action.payload}`, config);
        yield put({
            type: 'SET_ATTENDEE_DETAILS',
            payload: response.data
        })

    } catch(err) {
        console.log('error in fetchAttendeeDetails saga', err);
    }
}

// updates the attendees info
function* updateAttendeePersonalInfo(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action.payload.AttendeeID);
        
        yield console.log('in updateAttendee', action.payload);
        yield axios.put(`/api/attendee/details/${action.payload.AttendeeID}`, action.payload, config);
        yield put ({
            type: 'SET_ATTENDEE_DETAILS',
        })
        
    }catch(err) {
        console.log('error in update details', err);
    }
}

// deletes the attendee from the database
function * deleteAttendeeInfo(action){
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log('in delete attendee info, action.payload:', action.payload);
        
        yield axios.delete (`api/attendee/delete/${action.payload}`, config);
        yield put ({
            type: 'FETCH_ALL_ATTENDEES'
        })  
        
     }catch(error){
         console.log('error in deleteAttendeeInfo', error);
         
     }
    }

function* attendeeDetailsSaga() {
    yield takeLatest('FETCH_ATTENDEE_PERSONAL_INFO', fetchAttendeePersonalInfo)
    yield takeLatest('UPDATE_ATTENDEE_INFO', updateAttendeePersonalInfo)
    yield takeLatest('DELETE_ATTENDEE_INFO', deleteAttendeeInfo)
}

export default attendeeDetailsSaga;