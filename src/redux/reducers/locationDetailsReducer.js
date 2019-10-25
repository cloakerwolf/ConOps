// hold on and changes a specific locations details when you change it in the input field
const locationDetailsReducer = (state = {LocationIsActive: true}, action) => {
    switch (action.type) {
        case 'SET_LOCATION_DETAILS':
            return action.payload;
        case 'EDIT_LOCATION_NAME':
            return {...state, LocationName: action.payload };
        case 'EDIT_LOCATION_DESCRIPTION':
            return {...state, LocationDescription: action.payload };
        case 'EDIT_LOCATION_STATUS':
            return {...state, LocationIsActive: action.payload};
        case 'CREATE_LOCATION_NAME':
            return { ...state, LocationName: action.payload };
        case 'CREATE_LOCATION_DESCRIPTION':
            return { ...state, LocationDescription: action.payload };
        default:
            return state;
    }
}

export default locationDetailsReducer;