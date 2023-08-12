import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, getSpotReviews } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

const PostBookingModal = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //COMMENT THIS BACK IN
    //COMMENT THIS BACK IN
    //COMMENT THIS BACK IN
    //COMMENT THIS BACK IN
    //COMMENT THIS BACK IN
    // const handlePost = (e) => {
    //     e.preventDefault()
    //     const newBooking = {
    //         spotId: spot.id,
    //         userId,
    //         startDate,
    //         endDate
    //     }
    //     dispatch(postBooking(newBooking))
    //     dispatch(fetchBookings())
    //     closeModal()
    // }
    // const handleNoPost = (e) => {
    //     e.preventDefault()
    //     closeModal()
    // }
    return (
        <>
        <h1>Test</h1>
        {/* <div className=‘delete-modal-div’>
            <p className=‘confirm-delete-title confirm-booking’>
                Confirm Booking
            </p>
            <p className=‘confirm-delete-text’>
                Please select the dates for your booking
            </p>
            <DatePicker className=‘date-picker’ selected={startDate} onChange={(date) => setStartDate(date)} />
            <p className=‘confirm-delete-text through-text’>
                Until
            </p>
            <DatePicker className=‘date-picker’ selected={endDate} onChange={(date) => setEndDate(date)} />
            <button onClick={handlePost} className=‘yes-delete-button button white-button’ type=‘button’ >Confirm Booking</button>
            <button onClick={handleNoPost} className=‘no-delete-button button grey-keep’ type=‘button’ >Cancel</button>
        </div> */}
        <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
        </>
    );
};
export default PostBookingModal;