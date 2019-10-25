import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchEventsInfo() {  //this will give the events reducer all of the events info
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/event`, config)
        yield put({ type: 'SET_EVENT_LIST', payload: response.data })
    } catch (error) {
        console.log('error in fetchEventsInfo', error);
    }
}

function* EventsSaga() {
    yield takeLatest('FETCH_EVENT_LIST', fetchEventsInfo)
}

export default EventsSaga;