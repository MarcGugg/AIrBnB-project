import { csrfFetch } from "./csrf"

const MAKE_BOOKING = 'bookings/Create'

const actionPostBooking = (booking) => {
    return {
        type: MAKE_BOOKING,
        booking
    }
}

export const postBooking = async (newBooking) => {
    const res = await csrfFetch(`/api/spots/${newBooking.spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'startDate': newBooking.startDate,
            'endDate': newBooking.endDate,
            'userId': newBooking.userId
        })
    })

    if (res.ok) {
        const booking = await res.json()
        dispatch(actionPostBooking(booking))
    }
}


let initialState = {
    allBookings: {},
    userBookings: {},
    spotBookings: {}
}
export default function bookingsReducer(state=initialState, action) {
    switch (action.type) {
        case MAKE_BOOKING: {
            let newState = {allBookings: {...state.allBookings}, userBookings: {...state.userBookings}, spotBookings: {...state.spotBookings}}
            
            newState.spotBookings[action.spotId].bookings[action.userId] = {...action.booking}

            return newState
        }
        default:
            return state
    }
}