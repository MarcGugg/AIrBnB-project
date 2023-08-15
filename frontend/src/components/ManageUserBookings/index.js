import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getUserBookings } from "../../store/bookings"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import './userBookings.css'

export default function UserBookings() {
    const dispatch = useDispatch()
    // const {userId} = useParams()
    const bookings = useSelector((state) => state.bookings.userBookings)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch, user])

    if (!bookings || !Object.values(bookings).length) {
        return null
    }

    return (
        <>
        <h1>Your Bookings</h1>
        {bookings && Object.values(bookings).length > 0 ? 
        Object.values(bookings).map(booking => 
        <div className="wholeBooking">
            <img src={booking.Spot.previewImage} className="preview"/>
            <div className="bookingInfo">
            <h2>{booking.Spot?.name}</h2>
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
            <p>Booked On: {booking.createdAt.slice(0, 10)}</p>
            <h3>Price /Night: ${booking.Spot.price}</h3>
            </div>
        </div>    
        )
        : <h1>You have not made any bookings</h1>}
        </>
    )
}