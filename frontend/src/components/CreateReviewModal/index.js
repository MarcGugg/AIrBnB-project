import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

import './Review.css'

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
                <div class="rate">
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label for="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label for="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label for="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label for="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label for="star1" title="text">1 star</label>
                </div>
            </div>
            <div>
                <button type='submit'>Submit Your Review</button>
            </div>
        </form>
    );
}