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
import DeleteReviewModal from '../DeleteReviewModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function SingleSpot() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviewAvg = useSelector((state) => state.spots.singleSpot.avgStarRating)
    const reviews = useSelector((state) => state.reviews.spot)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    console.log('spot', spot)
    console.log('avg rating', reviewAvg)
    // console.log('spot owner', spot.Owner)
    console.log('reviews og', reviews)
    // console.log('user', user)
    
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getSpotReviews(spotId))
        
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getSpotReviews(spotId))
    // }, [handleReviewChange])
    
    // const handleReviewChange = () => {
    //     const reviewThing = dispatch(getSpotReviews(spotId))
    //     console.log('reviewThing', reviewThing)
    //     return reviewThing
    //     // dispatch(getSingleSpot(spotId))
    // }
    // const handleRatingChange = () => {
    //     const spotThing = dispatch(getSingleSpot(spotId))
    //     console.log('spotThing', spotThing)
    //     return spotThing.avgStarRating
    // }

    useEffect(() => { //updates rating when review is added/removed/edited
        dispatch(getSingleSpot(spotId))
    }, [reviews])

    // const handleClick = (reviewId) => {
    //     // console.log('review id', reviewId)
        
    //     // dispatch(deleteReview(reviewId))
        
    //     <DeleteReviewModal reviewId={reviewId} />
    // }

    // let reviewsArr
    // if (reviews) {
    //     // reviews = null
    //     reviewsArr = Object.values(reviews.Reviews)
    // } 

    
    // console.log('reviews og', reviews.Reviews)
    // console.log('reviews array', Object.values(reviews))
    // for (let review of Object.values(reviews))
    
    // console.log('rating', spot.avgRating)

    const months = [
        "January", "February", 
        "March", "April", "May", 
        "June", "July", "August",
        "September", "October", 
        "November", "December"
    ];

    console.log('reviews',Object.values(reviews))

    let reviewUserIds = []
    for (let review of Object.values(reviews)) {
        reviewUserIds.push(review.userId)
    }

    const handleReserveClick = (e) => {
        e.preventDefault()
        window.alert('Feature coming soon')
    } 

    if (Object.keys(spot).length === 0 || !reviews) return null
    return (
        <>
        <div className='aboveReviews'>
            <div className='nameLocationParent'>
            <div className='spotName'>
            {spot.name}
            </div>
            <div className='spotLocation'>
                {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='updateButtonDiv'>
                <button className='updateButton'>
                    {user && user.id === spot.Owner.id ? 
                    <Link to={`/spots/${spot.id}/edit`}>Update Spot</Link>
                    :''}
                    {!user || user.id !== spot.Owner.id ?
                    <Link to={`/`}>Update Spot</Link>
                    : ''}
                </button>
            </div>
            </div>
            {/* <div className='imageParent'>                
            <div className='image'>
            </div>
            </div> */}
            <div className='allImages'>
                <div className='previewImage'>
                    {/* "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-exterior.jpg" */}
                    {spot.SpotImages.length > 0 ? 
                    <img src={spot.SpotImages[0].url} style={{width: 700, height: 500}}   
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-exterior.jpg"
                    }}/>
                    : ''}
                    
                </div>
                {spot.SpotImages.length > 1 ?                 
                <div className='otherImages'>
                    {spot.SpotImages.slice(1).map(image => (
                        <img src={image.url} style={{width: 300, height: 240}}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-exterior.jpg"
                        }}
                        />
                    ))}
                </div>
                : ''}
            </div>
            <div className='hostDescCallout'>
            <div className='hostAndDesc'>                
            <div className='spotOwner'>
                <h1>
            hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
                </h1>
            </div>
            <div className='spotDescription'>
                <h4>
            {spot.description}
                </h4>
            </div>
            <div className='reviewButton'>
                {/* put modal component into ternary */}
                {/* {user && spot.Owner.id !== user.id ? <OpenModalButton modalComponent={<CreateReviewModal spotId={spotId} user={user}/>} buttonText={'Post Your Review'} />: ''}  */}
            </div>
            </div>           
        {/* <div className='calloutInfoBoxParent'> */}
        <div className='calloutInfoBox'>
            <div className='priceRatingParent'>
            <div className='price'>
                ${spot.price} night
            </div>
            <div className='rating' >
                {/* Rating: {reviewAvg ? (reviewAvg).toFixed(1) : 'New'}  */}
                <p><FontAwesomeIcon icon={faStar} />{!reviewAvg ? 'New': (reviewAvg).toFixed(1)}</p>
            </div>
            {Object.values(reviews).length > 0 ? 
                <div className='dot'>
                ·
                </div>
            : ''}
            <div className='reviewCountParent'>
                {Object.values(reviews).length === 1 ? 
                    <div className='reviewCount' >
                        {Object.values(reviews).length} review
                    </div>
                : Object.values(reviews).length > 1 ? <div className='reviewCount'>{Object.values(reviews).length} reviews</div> :''}
            </div>
            </div>
            <div className='reserveButtonParent'>
                <button className='reserveButton' onClick={handleReserveClick}>Reserve</button>
            </div>
        </div>
        {/* </div> */}

            </div>
        </div>
        <div className='reviewButton'>
                {/* put modal component into ternary */}
                {user && !reviewUserIds.includes(user.id) ?                 
                <div className='submitReview'>
                {user && spot.Owner.id !== user.id ? <OpenModalButton modalComponent={<CreateReviewModal spotId={spotId} user={user}/>} buttonText={'Post Your Review'} />: ''} 
                </div>
                :''}
            </div>
            <div className='reviews'>
                {Object.values(reviews).length > 0 ? Object.values(reviews).slice(0).reverse().map(review => <li>
                    <div className='name'>
                        {review.User.firstName} {review.User.lastName}
                    </div>
                    <div className='reviewDate'>
                        {/* {review.createdAt.slice(5, 7)}, {review.createdAt.slice(0,4)} */}
                        {months[new Date(review.createdAt).getMonth()]} {new Date(review.createdAt).getFullYear()}
                    </div>
                    <div>
                    {review.review}
                    </div>
                    <div>
                        {user && review.userId === user.id ? <OpenModalButton modalComponent={<UpdateReviewModal reviewId={review.id} user={user}/>} buttonText={'Edit Your Review'}/>: ''}
                    </div>
                    <div>
                        {/* {user && review.userId === user.id ? <button className='deleteReview' onClick={() => handleClick(review.id)}>Delete Review</button>: ''} */}
                        {user && review.userId === user.id ? <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id}/>} buttonText={'Delete Review'}/>: ''}
                    </div>
                </li>) : <div>{user && spot.Owner.id !== user.id ? <p>Be the first to post a review!</p>: ''}</div>}
            </div>
        </>
    );
}