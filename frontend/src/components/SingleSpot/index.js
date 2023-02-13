import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../store/spots';

import './SingleSpot.css'

export default function SingleSpot() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])
    
    if (Object.keys(spot).length === 0) return null
    return (
        <>
        <div>
            <div className='spotName'>
            {spot.name}
            </div>
            <img src={spot.SpotImages[0].url} style={{width: 700, height: 500}} className='image'/>
            <div className='spotOwner'>
            {spot.owner}
            </div>
            <div className='spotDescription'>
            {spot.description}
            </div>
        </div>
        </>
    );
}