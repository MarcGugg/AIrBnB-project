import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, getSpotReviews } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

import { deleteBooking } from '../../store/bookings';

export default function DeleteBooking({booking}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    
    const handleDeleteClick = async () => {
        await dispatch(deleteBooking(booking.id))
        .then(closeModal)
    }

    return (
        <>
        <h1>Delete Booking?</h1>
        <button onClick={handleDeleteClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </>
    )
}