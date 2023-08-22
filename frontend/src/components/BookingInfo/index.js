import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getUserBookings } from "../../store/bookings"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { deleteBooking } from "../../store/bookings"
import DeleteBooking from "../DeleteBookingModal"
import OpenModalButton from "../OpenModalButton"
import EditBookingModal from "../EditBooking"


export default function BookingInfo({booking}) {
    
    const [show, setShow] = useState(false)
    
    return (
        <>
        <div className="wholeBooking">
            <img src={booking.Spot?.previewImage} className="preview"/>
            <div className="bookingInfo">
            <h2>{booking.Spot?.name}</h2>
            {/* start and end date objects manipulated as seen below bc new Date() in backend bookiong creation*/}
            {/* causes the dates to display as one day ahead (bc it changes from local time to UTC) */}
            {/* this manipulation returns them to normal and displays them in a more readable format*/}
            <p>Start Date: {new Date(booking.startDate).toString().slice(0, 15)}</p>
            <p>End Date: {new Date(booking.endDate).toString().slice(0, 15)}</p>
            {/* <p>Booked On: {booking.createdAt.slice(0, 10)}</p> */}
            <p>Booked On: {new Date(booking.createdAt).toString().slice(0, 15)}</p>
            <h3>Price /Night: ${booking.Spot?.price}</h3>
            </div>

            <div className="bookingInfoButtons">
               <OpenModalButton modalComponent={<DeleteBooking booking={booking}/>} buttonText={'Delete'}/>
                <button onClick={() => setShow(!show)} className="bookingInfoEditButton">Edit</button>
                <EditBookingModal booking={booking} show={show} closeModal={() => setShow(false)}/>    
            </div>
        </div>
        </>
    )
}