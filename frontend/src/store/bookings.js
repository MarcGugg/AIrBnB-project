import { csrfFetch } from "./csrf"

const MAKE_BOOKING = 'bookings/Create'
const USER_BOOKINGS = 'bookings/userBookings'
const DELETE_BOOKING = 'booking/delete'

const actionPostBooking = (booking) => {
    return {
        type: MAKE_BOOKING,
        booking
    }
}

const actionUserBookings = (bookings) => {
    return {
        type: USER_BOOKINGS,
        bookings
    }
}

const actionDeleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

export const postBooking =  (newBooking) => async (dispatch) => {
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

export const getUserBookings = () => async (dispatch)  => {
    const res = await csrfFetch(`/api/bookings/current`)

    if (res.ok) {
        const bookings = await res.json()
        dispatch(actionUserBookings(bookings))
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        await dispatch(actionDeleteBooking(bookingId))
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
        case USER_BOOKINGS: {
            // console.log('USER BOOKINGS', action)
            let newState2 = {allBookings: {...state.allBookings}, userBookings: {...state.userBookings}, spotBookings: {...state.spotBookings}}
            
            // for (let i = 0; i < action.bookings.Bookings.length; i++) {
            //     newState2.userBookings[i] = {...action.bookings.Bookings[i]}
            // }
            action.bookings.Bookings.map(booking => newState2.userBookings[booking.id] = {...booking})
            // newState2.userBookings = [...action.bookings.Bookings]

            return newState2
        }
        case DELETE_BOOKING: {
            let newState3 = {allBookings: {...state.allBookings}, userBookings: {...state.userBookings}, spotBookings: {...state.spotBookings}}

            delete newState3.userBookings[action.bookingId]
            
            return newState3
        }
        default:
            return state
    }
}