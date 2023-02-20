import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, getSpotReviews } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { editReview, postReview } from '../../store/reviews';

import './UpdateReview.css'

export default function UpdateReviewModal({reviewId, user}) {
    const reviewRetrieve = useSelector((state) => state.reviews.spot)
    // console.log('review retrieve', reviewRetrieve)
    // console.log(reviewId)

    let reviewToEdit
    for (let currReview of Object.values(reviewRetrieve)) {
        if (currReview.id === reviewId) {
            reviewToEdit = {...currReview}

        }
    }

    // console.log('target review', reviewToEdit)

    const [review, setReview] = useState(reviewToEdit.review)
    const [stars, setStars] = useState(reviewToEdit.stars)

    const {closeModal} = useModal()

    const dispatch = useDispatch()

    const reviewObj = {
        review,
        stars
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewDetails = {...reviewObj}
        // const newReview = await dispatch(postReview(reviewToSubmit, spotId))
        // console.log('new review', newReview)
        // dispatch(getSingleSpot(spotId))
        return dispatch(editReview(reviewDetails, user, reviewId))
        .then(closeModal)
        // closeModal()
    }


    return (
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div>
                <div className='topText'>How was your stay?</div>
                <textarea name='review' value={review} className='reviewText' onChange={(e) => setReview(e.target.value)}/>
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
                <button type='submit' className='submitButton' disabled={review.length < 10 || stars < 1}>Update Your Review</button>
            </div>
        </form>
    );
}