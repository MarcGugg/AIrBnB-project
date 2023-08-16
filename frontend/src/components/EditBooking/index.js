import React from 'react';
// import { ReactDOM } from 'react';
import ReactDOM from 'react-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { editBooking, getUserBookings } from '../../store/bookings';

import { useState, useEffect} from 'react';

import './editBooking.css'
import { useDispatch } from 'react-redux';

export default function EditBookingModal({booking, show, closeModal}) {
    
    const dispatch = useDispatch()

    const [currStartDate, setCurrStartDate] = useState(new Date(booking.startDate) || null)
    const [currEndDate, setCurrEndDate] = useState(new Date(booking.endDate) || null)

    // useEffect(() => {
    //     console.log('booking in modal', booking)
    //     console.log('show', show)
    //     console.log(currStartDate)
    // })
    
    const handleSubmit = async () => {
        const newBooking = {
            "startDate": currStartDate,
            "endDate": currEndDate,
            "id": booking.id
        }
        await dispatch(editBooking(newBooking))
        await dispatch(getUserBookings())
        .then(closeModal)
    }

    if (!show) return null

    return ReactDOM.createPortal(
        <>
        <div className='editBookingModalParent'>
            <div className='editBookingContent'>
                <div className='editBookingDatePickers'>
                    <div>
                        <h1>Edit Booking</h1>
                        <p>Start Date</p>
                        <ReactDatePicker selected={currStartDate} onChange={(date) => setCurrStartDate(date)}/>
                        <p>End Date</p>
                        <ReactDatePicker selected={currEndDate} onChange={(date) => setCurrEndDate(date)}/>
                    </div>
                </div>
                
                <div className='editBookingButtons'>
                    <button onClick={handleSubmit} className='bookingUpdateButton'>Update</button>
                    <button onClick={closeModal} className='bookingModalCancelButton'>Cancel</button>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('root')
    )
}