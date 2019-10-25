import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * gottaFetchEmAll(){  //this will give the attendee check in reducer all attendees
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        };
    const response = yield axios.get(`/api/attendee`, config)
        yield put({ type: 'SET_ATTENDEE_CHECK_IN_LIST', payload: response.data})
    }catch(error){
        console.log('error in gottaFetchEmAll', error);
    }
}

function * fetchWalkIns(){ // go to the DB and get me all the Walkins, send them to the reducer
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/attendee/walk_ins`, config)
        yield put({ type: 'SET_ATTENDEE_CHECK_IN_LIST', payload: response.data})
    }catch(error){
        console.log('error fetching walk ins', error);
    }
}

function * fetchCheckedInAttendees(){  //go to the DB and get me all the checked in, send them to the reducer
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/attendee/checked_in`, config)
        yield put({ type: 'SET_ATTENDEE_CHECK_IN_LIST', payload: response.data }) 
    }catch (error){
        console.log('error in fetching the checked_in', error);
    }
}

function* fetchPreRegisteredAttendees() { // go to the DB and get me all the preregistered, send them to the reducer
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/attendee/pre_registered`, config)
        yield put({ type: 'SET_ATTENDEE_CHECK_IN_LIST', payload: response.data })
    } catch (error) {
        console.log('error in fetching the checked_in', error);
    }
}

function * attendeesCheckInSaga(){
    yield takeLatest('FETCH_ALL_ATTENDEES', gottaFetchEmAll)  //sorry for the name team but its fun
    yield takeLatest('FETCH_WALK_INS', fetchWalkIns)
    yield takeLatest('FETCH_CHECKED_IN_ATTENDEES', fetchCheckedInAttendees)
    yield takeLatest('FETCH_PRE-REGISTERED_ATTENDEES', fetchPreRegisteredAttendees)
}

export default attendeesCheckInSaga;