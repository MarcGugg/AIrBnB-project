import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateNewSpot from "../CreateNewSpot";
import DeleteReviewModal from '../DeleteReviewModal'
import UpdateReviewModal from "../UpdateReviewModal";
import { Link, useHistory } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";

import './ManageReviews.css'

export default function ManageReviews() {
    const reviews = useSelector((state) => state.reviews.user.userReviews)
    const user = useSelector((state) => state.session)
    console.log('user reviews', reviews)

    let spots = []
    for (let review in reviews) {
        spots.push(review.Spot)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    if(!reviews || !spots.length) return null

    return (
        <>
        <h1>Manage Reviews</h1>
        <div className="allReviews">
            {Object.values(reviews).map(review => (
                <div className="review">
                    {review.Spot ? <div>{review.Spot.name}</div>: ''}
                    <div>{review.createdAt.slice(0, 10)}</div>
                    <div>{review.review}</div>
                    <div className="buttons">
                    <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id}/>} buttonText={'Delete Review'}/>
                    <OpenModalButton modalComponent={<UpdateReviewModal reviewId={review.id} user={user}/>} buttonText={'Edit Your Review'}/>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}