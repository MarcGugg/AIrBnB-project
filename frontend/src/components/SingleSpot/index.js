import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import './SingleSpot.css'
import { getSpotReviews } from '../../store/reviews';

export default function SingleSpot() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviews = useSelector((state) => state.reviews.spot)
    const dispatch = useDispatch()

    console.log('spot', spot)
    
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
    // console.log('reviews', Object.values(reviews))
    // for (let review of Object.values(reviews))
    
    if (Object.keys(spot).length === 0) return null
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
                {reviews && Object.values(reviews.Reviews).map(review => <li>
                    {review.review}
                </li>)}
            </div>
        </div>
        </>
    );
}