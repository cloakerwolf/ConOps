import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* postNewConvention(action) {  // find all the personal information of all attendees that share the same orderID
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action.payload);
        
        yield axios.post('/api/convention', action.payload, config)
        yield put({ type: 'FETCH_CONVENTION'})
    } catch (error) {
        console.log('error in postNewConvention', error);
    }
}

//  receives all the conventions from the database 
function* getConvention() {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/convention', config);
        yield put({ type: 'SET_CONVENTION_INFO', payload: response.data })
    } catch (error) {
        console.log('error in getConvention', error);
}
}

// sends updates made to the convention to the server to be updated
function* updateConvention(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.put(`/api/convention`, action.payload, config);
        yield put({ type: 'FETCH_CONVENTION' });
    } catch (error) {
        console.log('error in UpdateConvention', error);
    }
}

function * ConventionsSaga() {
    yield takeLatest('ADD_NEW_CONVENTION', postNewConvention)
    yield takeLatest('FETCH_CONVENTION', getConvention)
    yield takeLatest('UPDATE_CONVENTION', updateConvention)
}

export default ConventionsSaga;