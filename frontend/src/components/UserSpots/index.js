import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getUserSpots } from '../../store/spots';

import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal';

import './UserSpots.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function UserSpots() {
    const userSpots = useSelector((state) => state.spots.userSpots) 

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    console.log('userSpots', userSpots)

    if (!Object.values(userSpots)) return null

    return (
        <>
        <div>
            <h1 className='manageSpots-Header'>Manage Your Spots</h1>
            <div>
            <NavLink className='createSpotButton-2' to='/spots'>Create new Spot</NavLink>
            </div>
            <div className='userSpotsList'>
                {userSpots && Object.values(userSpots).map(spot => <li key={spot.name} className='user-spotCard'>
                    {/* <p>{spot.name}</p> */}
                    <p>
                        <img src={spot.previewImage} style={{width: 270, height: 250}}/>
                    </p>
                    <div className='location-price'>
                    {/* <p>{spot.address}</p> */}
                    <p>{spot.city}, {spot.state}</p>
                    {/* <p>{spot.description}</p> */}
                    <p>{spot.price} /night</p>
                    </div>
                    <div className='editAndDelete-rating'>
                    <div className='rating'><FontAwesomeIcon icon={faStar} />{!spot.avgRating ? 'New': spot.avgRating}</div>
                    <div className='editButton'>
                        <Link to={`/spots/${spot.id}/edit`}>
                        <button className='updateSpotButton'>Update</button>
                        </Link>
                    </div>
                    <div className='deleteButton'>
                        <OpenModalButton modalComponent={<DeleteSpotModal spotId={spot.id}/>} buttonText={'Delete'}/>
                    </div>
                    </div>
                    </li>)}
            </div>
        </div>
        </>
    )
}