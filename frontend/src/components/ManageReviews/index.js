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

export default function ManageReviews() {
    // const user = useSelector((state) => )
    const reviews = useSelector((state) => state.reviews.user.userReviews)
    const user = useSelector((state) => state.session)
    console.log('user reviews', reviews)
    // const {Reviews} = reviews
    // console.log('Reviews', Reviews)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    if(!reviews) return null

    return (
        <>
        <h1>Manage Reviews</h1>
        <div className="allReviews">
            {Object.values(reviews).map(review => (
                <div className="review">
                    {/* <div>{review.Spot.name}</div> */}
                    <div>{review.createdAt}</div>
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