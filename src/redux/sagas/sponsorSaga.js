import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetches the sponsors from the database
function* fetchSponsors() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/sponsor`, config)
        yield put({ type: 'SET_SPONSORS', payload: response.data })
    } catch (error) {
        console.log('error in fetchSponsor saga:', error)
    }
}

// posts a new sponsor to the database
function* addSponsor(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
    };
    yield axios.post(`/api/sponsor`, action.payload, config)
    yield put({type: 'FETCH_SPONSORS'})
    } catch (error) {
        console.log('error in addSponsor saga:', error)
    }
}


// goes to index.js in saga folder
function* sponsorSaga() {
    yield takeLatest('FETCH_SPONSORS', fetchSponsors)
    yield takeLatest('ADD_SPONSOR', addSponsor)
}

export default sponsorSaga;