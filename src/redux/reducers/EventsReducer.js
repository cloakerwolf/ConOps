// hangs on to the events coming from the database
const EventsReducer = (state = [] , action) => {
    switch (action.type) {
        case 'SET_EVENT_LIST':
            return action.payload;
        default:
            return state;
    }
}



export default EventsReducer;