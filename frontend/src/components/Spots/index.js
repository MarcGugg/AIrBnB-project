import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';



export default function Spots() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.allSpots)

    console.log('spots',spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!Object.values(spots).length) return null
    return (
        <>
        <div>Spots</div>
        {spots && Object.values(spots).map(spot => (<Link key={spot.id} to={`spots/${spot.id}`}>{spot.name} 
            <img src={spot.previewImage}/>
            <p>{spot.price}/Night</p>
            <p>{spot.address}</p>
            <p>{spot.city}</p>
            <p>{spot.country}</p>
            <p>average rating: {spot.avgRating}</p>
        </Link>))}
        </>
    )
}

// {tweetList?.map(({ id, message }) => (
//     <p key={id}>{message}</p>
//   ))}