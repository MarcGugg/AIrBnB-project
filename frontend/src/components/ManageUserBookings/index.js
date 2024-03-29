import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getUserBookings } from "../../store/bookings"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import DeleteBooking from "../DeleteBookingModal"
import OpenModalButton from "../OpenModalButton"
import EditBookingModal from "../EditBooking"
import BookingInfo from "../BookingInfo"

import './userBookings.css'

export default function UserBookings() {
    const dispatch = useDispatch()
    // const {userId} = useParams()

    // const [show, setShow] = useState(false)

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
        Object.values(bookings).reverse().map(booking => 
            // maybe render all JSX in a seperate component
        // <div className="wholeBooking">
        //     <img src={booking.Spot.previewImage} className="preview"/>
        //     <div className="bookingInfo">
        //     <h2>{booking.Spot?.name}</h2>
        //     <p>Start Date: {booking.startDate}</p>
        //     <p>End Date: {booking.endDate}</p>
        //     <p>Booked On: {booking.createdAt.slice(0, 10)}</p>
        //     <h3>Price /Night: ${booking.Spot.price}</h3>
        //     </div>
        //     <OpenModalButton modalComponent={<DeleteBooking booking={booking}/>} buttonText={'Delete'}/>
        //     <button onClick={() => setShow(!show)}>Edit</button>
        //     <EditBookingModal booking={booking} show={show} closeModal={() => setShow(false)}/>    
        // </div>
        <BookingInfo booking={booking}/>
        )
        : <h1>You have not made any bookings</h1>}
        </>
    )
}