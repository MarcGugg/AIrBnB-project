import React from 'react';
// import { ReactDOM } from 'react';
import ReactDOM from 'react-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, useEffect, Dispatch } from 'react';

import './editBooking.css'

export default function EditBookingModal({booking, show, closeModal}) {
    
    const [currStartDate, setCurrStartDate] = useState(booking.startDate || null)
    const [currEndDate, setCurrEndDate] = useState(booking.endDate || null)

    useEffect(() => {
        console.log('booking in modal', booking)
    })
    
    if (!show) return null

    return ReactDOM.createPortal(
        <>
        <div className='editBookingModalParent'>
            <div className='editBookingContent'>
                <h1>Edit Booking</h1>
                {/* <ReactDatePicker selected={currStartDate} onChange={(date) => setCurrStartDate(date)}/>
                <ReactDatePicker selected={currEndDate} onChange={(date) => setCurrEndDate(date)}/> */}
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
        </>,
        document.getElementById('root')
    )
}