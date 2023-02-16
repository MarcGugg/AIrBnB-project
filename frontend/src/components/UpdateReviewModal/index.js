import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, getSpotReviews } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { editReview, postReview } from '../../store/reviews';



export default function UpdateReviewModal({reviewId}) {
    const reviewRetrieve = useSelector((state) => state.reviews.spot.Reviews)
    console.log('review retrieve', reviewRetrieve)

    let reviewToEdit
    for (let currReview of reviewRetrieve) {
        if (currReview.id === reviewId) {
            reviewToEdit = currReview
        }
    }

    console.log('target review', reviewToEdit)

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
        return dispatch(editReview(reviewDetails, reviewId))
        .then(closeModal)
        // closeModal()
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <textarea name='review' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div>
                Stars
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label htmlFor="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label htmlFor="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label htmlFor="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label htmlFor="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label htmlFor="star1" title="text">1 star</label>
                </div>
            </div>
            <div>
                <button type='submit'>Update Your Review</button>
            </div>
        </form>
    );
}