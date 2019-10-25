import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// grabs the details from a specific sponsor that is clicked on 
function* fetchSponsorDetails(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //logging to make sure we're getting ID from click
        yield console.log('in fetchSponsorDetails:', action.payload);
        const response = yield axios.get(`/api/sponsor/details/${action.payload}`, config);
        yield put({
            type: 'SET_SPONSOR_DETAILS',
            payload: response.data
        })

    } catch (error) {
        console.log('error in fetch sponsor details saga', error);
    }
}

// sends a put request to update the sponsors details
function* updateSponsorDetails(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log('in update sponsor details saga:', action.payload.SponsorID);
        yield axios.put(`/api/sponsor/details/${action.payload.SponsorID}`, action.payload, config);
        yield put({
            type: 'SET_SPONSOR_DETAILS'
        })
    } catch (error) {
        console.log('error in sponsor details saga:', error)
    }
}

// goes to index.js in saga folder
function* sponsorDetailsSaga() {
    yield takeLatest('FETCH_SPONSOR_DETAILS', fetchSponsorDetails)
    yield takeLatest('UPDATE_SPONSOR_DETAILS', updateSponsorDetails)
}

export default sponsorDetailsSaga;