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

    if(!reviews || !spots.length) {
        return (
            <p className="placeholderMessage">Please visit a spot to post a review</p>
        )
    }
    
    const months = [
        "January", "February", 
        "March", "April", "May", 
        "June", "July", "August",
        "September", "October", 
        "November", "December"
    ];

    return (
        <>
        <h1>Manage Reviews</h1>
        <div className="allReviews">
            {Object.values(reviews).map(review => (
                <div className="review">
                    {review.Spot ? <h2>{review.Spot.name}</h2>: ''}
                    <div className="date">{months[new Date(review.createdAt).getMonth()]} {new Date(review.createdAt).getFullYear()}</div>
                    <div style={{fontWeight: "bold"}}>{review.review}</div>
                    <div className="buttons">
                    <OpenModalButton modalComponent={<UpdateReviewModal reviewId={review.id} user={user}/>} buttonText={'Update'}/>
                    <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id}/>} buttonText={'Delete'}/>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}