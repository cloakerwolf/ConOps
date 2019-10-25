// hangs on to the conventions and allows it to be updated when you change it
const conventionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONVENTION_INFO':
            return action.payload
        case 'UPDATE_NAME':
            return { ...state, ConventionName: action.payload};
        case 'UPDATE_START_TIME':
            return { ...state, ConventionStartTime: action.payload };
        case 'UPDATE_END_TIME':
            return { ...state, ConventionEndTime: action.payload }
        default:
            return state;
    }
}


export default conventionsReducer;