import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getUserSpots } from '../../store/spots';

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
            <h1>Manage Your Spots</h1>
            <div className='userSpotsList'>
                {userSpots && Object.values(userSpots).map(spot => <li key={spot.name}>
                    <p>{spot.name}</p>
                    <p>
                        <img src={spot.previewImage} style={{width: 700, height: 500}}/>
                    </p>
                    <p>{spot.address}</p>
                    <p>{spot.city}, {spot.state}</p>
                    <p>{spot.description}</p>
                    <p>{spot.price} /night</p>
                    </li>)}
            </div>
        </div>
        </>
    )
}