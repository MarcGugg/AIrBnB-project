import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteSpot } from '../../store/spots';

import { useModal } from '../../context/Modal';

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
        <h3>Are you sure you want to delete this spot?</h3>
        <button onClick={handleClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </>
    )
}