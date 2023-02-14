import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

export default function CreateReviewModal({spotId}) {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)

    const dispatch = useDispatch()

    const reviewObj = {
        review,
        stars
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const reviewToSubmit = {...reviewObj}
        dispatch(postReview(reviewToSubmit, spotId))
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <textarea name='review' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div>
                Stars
            </div>
            <div>
                <button type='submit'>Submit Your Review</button>
            </div>
        </form>
    );
}