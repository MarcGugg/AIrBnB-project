import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';
import './Spots.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Spots() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.allSpots)

    // console.log('spots',spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!Object.values(spots).length) return null
    return (
        <>
        {/* <div>Spots</div> */}
        <div className='spotsDisplayParent'>
        <div className='spotsDisplay'>
        {spots && Object.values(spots).map(spot => (<Link key={spot.id} to={`spots/${spot.id}`}>
            <div title={spot.name}>
            <div className='spotCard'>                
            <img src={spot.previewImage} style={{width: 270, height: 250}}
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                }}
            alt='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'/>
            <div className='cityStateRating'>
            <p>{spot.city}, {spot.state}</p>
            <p><FontAwesomeIcon icon={faStar} />{!spot.avgRating ? 'New': (spot.avgRating).toFixed(1)}</p>
            </div>
            <div>
            <p className='spotPrice'>{spot.price}/Night</p>
            </div>
            {/* <p>{spot.address}</p> */}
            {/* <p>{spot.country}</p> */}

            {/* <p className='spotAvgRating'>average rating: {spot.avgRating}</p> */}
            </div> 
            {/* style={{width: 300, height: 300}} */}
            </div>
        </Link>))}
        </div>
        </div>
        </>
    )
}

// {tweetList?.map(({ id, message }) => (
//     <p key={id}>{message}</p>
//   ))}