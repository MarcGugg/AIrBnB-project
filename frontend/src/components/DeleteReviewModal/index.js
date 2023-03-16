import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteSpot } from '../../store/spots';

import { useModal } from '../../context/Modal';

import { deleteReview} from '../../store/reviews';

import './DeleteReview.css'

export default function DeleteReviewModal({reviewId}) {
    const {closeModal} = useModal()

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(deleteReview(reviewId))
        .then(closeModal)
    }

    return (
        <div className='wholeModal'>
            <div className='text'>
                <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review?</h3>
            </div>
            <div className='buttons'>
            <button onClick={handleClick} className='yesButton'>{"Yes (Delete Review)"}</button>
            <button onClick={closeModal} className='noButton'>{"No (Keep Review)"}</button>
            </div>
        </div>
    )
}