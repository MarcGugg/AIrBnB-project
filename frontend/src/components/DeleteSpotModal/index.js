import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteSpot } from '../../store/spots';

import { useModal } from '../../context/Modal';
import './DeleteSpot.css'

export default function DeleteSpotModal({spotId}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spotId))
        .then(closeModal)
    }

    return (
        <>
        <h1 className='header'>Confirm Delete</h1>
        <h3 className='message'>Are you sure you want to remove this spot?</h3>
        <div className='yesNo-buttons'>
        <button className='yes' onClick={handleClick}>{'Yes (Delete Spot)'}</button>
        <button className='no' onClick={closeModal}>{'No (Keep Spot)'}</button>
        </div>
        </>
    )
}