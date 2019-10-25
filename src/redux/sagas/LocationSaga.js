import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets locations from database
function* fetchLocations() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
    const response = yield axios.get(`/api/location`, config)
        yield put ({ type:  'SET_LOCATIONS', payload: response.data  })
    } catch  (error) {
    console.log('error in fetchLocations saga:', error)
    }
}

// sends a post request to add a location to the database
function* addLocation(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post(`/api/location`, action.payload, config)
        console.log('in addLocationSaga:', action.payload)
        yield put({ type: 'FETCH_LOCATIONS' })
    } catch (error) {
        console.log('error in addLocation saga:', error)
    }
}

function* locationSaga() {
    yield takeLatest('FETCH_LOCATIONS', fetchLocations)
    yield takeLatest('ADD_LOCATION', addLocation)
}

export default locationSaga;