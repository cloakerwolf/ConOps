// holds on to the news coming from the reducer
const homePageReducer = (state = {ConventionNews: 'p'}, action) => {

    switch (action.type) {
        case 'SET_NEWS':
            return action.payload;
        case 'EDIT_CONVENTION_NEWS':
            return {...state, ConventionNews: action.payload}   
            default:
                return state;
    }
}




export default homePageReducer;