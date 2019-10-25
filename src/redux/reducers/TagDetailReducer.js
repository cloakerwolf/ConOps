// holds a single tags details and changes it when you change it
const TagDetailReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAG':
            console.log('tag details ', action.payload);
            return action.payload;
        case 'UPDATE_PROPERTY':
            return {
                ...state,
                [action.payload.key]: action.payload.newValue,
            };
        default:
            return state;
    }
}



export default TagDetailReducer;