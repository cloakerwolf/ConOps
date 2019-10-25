//holds all the attendees based off the filters
const attendeeCheckInReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTENDEE_CHECK_IN_LIST':
            return action.payload
        default:
            return state;
    }
}


export default attendeeCheckInReducer;