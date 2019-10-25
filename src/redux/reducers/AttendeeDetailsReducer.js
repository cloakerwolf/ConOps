// holds one attendee and allows you to edit that attendees details 

const attendeeDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ATTENDEE_DETAILS':
            return action.payload;
        case 'EDIT_DETAIL_FIRST_NAME':
            return {...state, FirstName: action.payload};
        case 'EDIT_DETAIL_MIDDLE_NAME':
            return {...state, MiddleName: action.payload};
        case 'EDIT_DETAIL_LAST_NAME':
            return {...state, LastName: action.payload};
        case 'EDIT_DETAIL_ADDRESS_ONE':
            return {...state, AddressLineOne: action.payload};
        case 'EDIT_DETAIL_ADDRESS_TWO':
            return {...state, AddressLineTwo: action.payload};
        case 'EDIT_DETAIL_CITY':
            return {...state, City: action.payload};
        case 'EDIT_DETAIL_STATE_PROVINCE':
            return {...state, StateProvince: action.payload};
        case 'EDIT_DETAIL_POSTAL_CODE':
            return {...state, PostalCode: action.payload};
        case 'EDIT_DETAIL_COUNTRY_ID':
            return {...state, CountryID: action.payload};
        case 'EDIT_DETAIL_EMAIL_ADDRESS':
            return {...state, EmailAddress: action.payload};
        case 'EDIT_DETAIL_PHONE_NUMBER':
            return {...state, PhoneNumber: action.payload};
        case 'EDIT_DETAIL_DATE_OF_BIRTH':
            return {...state, DateOfBirth: action.payload};
        case 'EDIT_DETAIL_BADGE_NAME':
            return {...state, BadgeName: action.payload};
        case 'EDIT_DETAIL_CHECK_IN_DATE':
            return {...state, CheckInDate: action.payload};
        case 'EDIT_DETAIL_PAYMENT_DATE': 
            return {...state, PaymentDate: action.payload};
        default:
            return state;
    }
}


export default attendeeDetailsReducer;