import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import OpenModalButton from '../OpenModalButton'

import './SingleSpot.css'
import { deleteReview, getSpotReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import UpdateReviewModal from '../UpdateReviewModal';

export default function SingleSpot() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviews = useSelector((state) => state.reviews.spot)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    // console.log('spot', spot)
    // console.log('spot owner', spot.Owner)
    // console.log('reviews og', reviews)
    // console.log('user', user)
    
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getSpotReviews(spotId))
        
    }, [dispatch])
    
    const handleClick = (reviewId) => {
        // console.log('review id', reviewId)
        dispatch(deleteReview(reviewId))
    }

    // let reviewsArr
    // if (reviews) {
    //     // reviews = null
    //     reviewsArr = Object.values(reviews.Reviews)
    // } 

    
    // console.log('reviews og', reviews.Reviews)
    // console.log('reviews array', Object.values(reviews))
    // for (let review of Object.values(reviews))
    
    if (Object.keys(spot).length === 0 || !reviews) return null
    return (
        <>
        <div>
            <header className='spotNameParent'>             
            <div className='spotName'>
            {spot.name}
            </div>
            </header>
            <div className='spotLocation'>
                {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='image'>
            <img src={spot.SpotImages[0].url} style={{width: 700, height: 500}}/>
            </div>
            <div className='spotOwner'>
            hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
            </div>
            <div className='spotDescription'>
            {spot.description}
            </div>
            <div>
                {/* put modal component into ternary */}
                {user && spot.Owner.id !== user.id ? <OpenModalButton modalComponent={<CreateReviewModal spotId={spotId} user={user}/>} buttonText={'Post Your Review'} />: ''} 
            </div>
            <div>
                {reviews && Object.values(reviews).map(review => <li>
                    <div>
                        {review.User.firstName} {review.User.lastName}
                    </div>
                    <div>
                    {review.review}
                    </div>
                    <div>
                        {user && review.userId === user.id ? <OpenModalButton modalComponent={<UpdateReviewModal reviewId={review.id} user={user}/>} buttonText={'Edit Your Review'}/>: ''}
                    </div>
                    <div>
                        {user && review.userId === user.id ? <button onClick={() => handleClick(review.id)}>Delete Review</button>: ''}
                    </div>
                </li>)}
            </div>
        </div>
        <div className='calloutInfoBoxParent'>
        <div className='calloutInfoBox'>
            <div className='priceRatingParent'>
            <div className='price'>
                ${spot.price} night
            </div>
            <div className='rating'>
                Rating: {!spot.avgRating ? 'New': spot.avgRating}
            </div>
            </div>
            <div className='reserveButtonParent'>
                <button className='reserveButton'>Reserve</button>
            </div>
        </div>
        </div>
        </>
    );
}