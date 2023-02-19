import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, getSpotReviews } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

import './Review.css'

export default function CreateReviewModal({spotId, user}) {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)

    const {closeModal} = useModal()

    const dispatch = useDispatch()

    const reviewObj = {
        review,
        stars
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewToSubmit = {...reviewObj}
        // const newReview = await dispatch(postReview(reviewToSubmit, spotId))
        // console.log('new review', newReview)
        // dispatch(getSingleSpot(spotId))
        return dispatch(postReview(reviewToSubmit, user, spotId))
        .then(closeModal)
        // closeModal()
    }


    return (
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div>
                <div className='topText'>How was your stay?</div>
                <textarea name='review' className='reviewText' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div>
                Stars
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value={5} onChange={(e) => setStars(e.target.value)} />
                  <label htmlFor="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value={4} onChange={(e) => setStars(e.target.value)} />
                  <label htmlFor="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value={3} onChange={(e) => setStars(e.target.value)} />
                  <label htmlFor="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value={2} onChange={(e) => setStars(e.target.value)} />
                  <label htmlFor="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value={1} onChange={(e) => setStars(e.target.value)} />
                  <label htmlFor="star1" title="text">1 star</label>
                </div>
            </div>
            <div className='submitButtonParent'>
                <button type='submit' className='submitButton'>Submit Your Review</button>
            </div>
        </form>
    );
}