import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import OpenModalButton from '../OpenModalButton'

import './SingleSpot.css'
import { getSpotReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';

export default function SingleSpot() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviews = useSelector((state) => state.reviews.spot)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    console.log('spot', spot)
    console.log('spot owner', spot.Owner)
    console.log('reviews og', reviews)
    console.log('user', user)
    
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getSpotReviews(spotId))
        
    }, [dispatch])
    
    // let reviewsArr
    // if (reviews) {
    //     // reviews = null
    //     reviewsArr = Object.values(reviews.Reviews)
    // } 

    
    // console.log('reviews og', reviews.Reviews)
    // console.log('reviews array', Object.values(reviews))
    // for (let review of Object.values(reviews))
    
    if (Object.keys(spot).length === 0 || !reviews.Reviews) return null
    return (
        <>
        <div>
            <div className='spotName'>
            {spot.name}
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
                {user && spot.Owner.id !== user.id ? <OpenModalButton modalComponent={<CreateReviewModal spotId={spotId}/>} buttonText={'Post Your Review'} onButtonClick={() => console.log(spotId)} />: ''} 
            </div>
            <div>
                {reviews && Object.values(reviews.Reviews).map(review => <li>
                    <div>
                        {review.User.firstName} {review.User.lastName}
                    </div>
                    {review.review}
                </li>)}
            </div>
        </div>
        </>
    );
}