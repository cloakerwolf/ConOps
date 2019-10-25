// hangs on to one event at a time and changes its details while you change it
const eventDetailsReducer = (state = { Tags: [], TagObjects: [], LocationName: '', EventName: '', EventStartTime: '', EventEndTime: '', EventModifiedNotes: '', EventDescription: ''}, action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload;
        case 'EDIT_EVENT_NAME':
            return { ...state, EventName: action.payload}
        case 'EDIT_EVENT_START_TIME':
            return { ...state, EventStartTime: action.payload}
        case 'EDIT_EVENT_END_TIME':
            return { ...state, EventEndTime: action.payload}
        case 'EDIT_EVENT_DESCRIPTION':
            return { ...state, EventDescription: action.payload}
        case 'EDIT_EVENT_LOCATION':
            return { ...state, LocationID: action.payload }
        case 'EDIT_EVENT_SPONSOR':
            return { ...state, SponsorID: action.payload }
        case 'CREATE_EVENT_SPONSOR':
            return { ...state, SponsorID: action.payload }
        case 'CREATE_EVENT_NAME':
            return { ...state, EventName: action.payload}
        case 'CREATE_EVENT_START_TIME':
            return { ...state, EventStartTime: action.payload }
        case 'CREATE_EVENT_END_TIME':
            return { ...state, EventEndTime: action.payload }
        case 'CREATE_EVENT_DESCRIPTION':
            return { ...state, EventDescription: action.payload}
        case 'CREATE_EVENT_LOCATION':
            return { ...state, LocationID: action.payload }
        case 'CREATE_EVENT_TAGS':
            return { ...state, TagName: action.payload }
        case 'EDIT_EVENT_TAGS':
            return { ...state, TagObjects: [...state.TagObjects, action.payload]}
        case 'EDIT_EVENT_LOCATION':
            return { ...state, LocationID: action.payload}
        case 'EDIT_EVENT_SPONSOR':
            return { ...state, SponsorID: action.payload}
        case 'EDIT_EVENT_MODIFIED_NOTES':
            return { ...state, EventModifiedNotes: action.payload}
        case 'REMOVE_TAG_FROM_EVENT':
            const newTagObjects = state.TagObjects;
            for (let i = 0; i < newTagObjects.length; i++) {
                if (action.payload === state.TagObjects[i]) {
                    newTagObjects.splice(i, 1)
                }
            }
            return { ...state, TagObjects: newTagObjects }
        case 'CLEAR_EVENT_DETAILS':
            return { Tags: [], TagObjects: [], LocationName: '', EventName: '', EventStartTime: '', EventEndTime: '', EventModifiedNotes: '', EventDescription: '' }
        // case 'ADD_YOGA_EVENT_FOR_DEMO':
        //     return { Tags: [], TagObjects: [], LocationName: '', LocationID: '', EventName: 'Gamer Yoga', EventStartTime: '2021-08-20T17:00:00.000Z', EventEndTime: '2021-08-20T19:00:00.000Z', EventDescription: 'Want to level up your body at the same time you level up your game? Join us at the kids corner (all ages welcome) and bring your favorite gaming controller or handheld gaming device to experience gaming in the here and now.' }
        // case 'ADD_YOGA_EVENT_FOR_DEMO':
        //     return { Tags: [], TagObjects: [], LocationName: '', LocationID: '', EventName: 'Canine Cosplay', EventStartTime: '2021-08-20T17:00:00.000Z', EventEndTime: '2021-08-20T19:00:00.000Z', EventDescription: 'Cosplay is an amazing art that is a staple at fan run conventions and events. But why should we have all the fun? Primp your pup and have them join us on the main stage in our first ever Canine Cosplay event!' }
        default:
            return state;
    }
}


export default eventDetailsReducer;