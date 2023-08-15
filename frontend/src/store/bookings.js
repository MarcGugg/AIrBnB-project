import { csrfFetch } from "./csrf"

const MAKE_BOOKING = 'bookings/Create'
const USER_BOOKINGS = 'bookings/userBookings'
const DELETE_BOOKING = 'booking/delete'
const EDIT_BOOKING = 'booking/edit'

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

const actionEditBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
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

export const editBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'startDate': booking.startDate,
            'endDate': booking.endDate
        })
    })

    if (res.ok) {
        const booking = await res.json()
        console.log('EDITED BOOKING', booking)
        dispatch(actionEditBooking(booking))
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
        case EDIT_BOOKING: {
            let newState4 = {allBookings: {...state.allBookings}, userBookings: {...state.userBookings}, spotBookings: {...state.spotBookings}}

            newState4.userBookings[action.booking.id] = {...action.booking}

            return newState4
        }
        default:
            return state
    }
}