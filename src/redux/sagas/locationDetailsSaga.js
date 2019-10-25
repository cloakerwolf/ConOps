import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetches locations details and sends them to reducer
function* fetchDetails(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //logging to make sure we're getting ID from click
        yield console.log('in fetchDetails:', action.payload);
        const response = yield axios.get(`/api/location/details/${action.payload}`, config);
        yield put({
            type: 'SET_LOCATION_DETAILS',
            payload: response.data
        })

    } catch (error) {
        console.log('error in fetch event details saga', error);
    }
}

// sends payload with updated location details to the server
function* updateDetails (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log('in update location details saga:', action.payload.LocationID);
        yield axios.put(`/api/location/details/${action.payload.LocationID}`, action.payload, config);
        yield put ({
            type: 'SET_LOCATION_DETAILS'
        })
    } catch(error) {
        console.log('error in location details saga:', error)
    }
}

function* locationDetailsSaga() {
    yield takeLatest('FETCH_LOCATION_DETAILS', fetchDetails)
    yield takeLatest('UPDATE_LOCATION_DETAILS', updateDetails)
}

export default locationDetailsSaga;