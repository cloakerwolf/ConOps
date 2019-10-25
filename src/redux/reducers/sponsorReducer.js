//hold on to all the sponsors coming from the database
const sponsorReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SPONSORS':
            return action.payload;
        default:
            return state;
    }
}

export default sponsorReducer;