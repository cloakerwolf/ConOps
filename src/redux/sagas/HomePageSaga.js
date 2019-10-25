import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets news from the server and database
function * fetchNews(){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/home/', config)
        yield put({
            type: 'SET_NEWS',
            payload: response.data
        })
}catch(error){
    console.log('error in fetchNews', error);
    
}
}

// updates and sends new data to the server and the data base
function * saveConventionNews(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield console.log('in saveConventionNews, action.payload :', action.payload);
        yield axios.put(`/api/home/edit`, action.payload, config)
        yield put({
           type: 'FETCH_NEWS'
        })
    }catch(error){
        console.log('error in saveConventionNews', error);
        
    }
}

function * homePageSaga(){
    yield takeLatest('FETCH_NEWS', fetchNews)
    yield takeLatest('SAVE_CONVENTION_NEWS', saveConventionNews)
}

export default homePageSaga;