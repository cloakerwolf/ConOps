// hold the tags coming from the database
const TagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAG_LIST':
            return action.payload;
        default:
            return state;
    }
}



export default TagsReducer;