import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';

import { createNewSpot } from '../../store/spots';

export default function CreateNewSpot() {
    const [validationErrors, setValidationErrors] = useState([])
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    
    const spot = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        imageURL
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('spot', spot)

        const errs = []

        if (typeof spot.price !== 'number') {
            errs.push('price must be a number')
            setValidationErrors(errs)
        } else {
            const newSpotObj = {...spot}
            dispatch(createNewSpot(newSpotObj))
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>    
            <label>Country
            <input value={country} onChange={(e) => setCountry(e.target.value)} type='text'/>
            </label>
            </div>

            <div>
            <label>Street Address
            <input value={address} onChange={(e) => setAddress(e.target.value)} type='text'/>
            </label>
            </div>

            <div>
            <label>City
            <input value={city} onChange={(e) => setCity(e.target.value)} type='text'/>
            </label>
            <label>State
            <input value={state} onChange={(e) => setState(e.target.value)} type='text'/>
            </label>
            </div>

            <div>
            <label>Description
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description'/>
            </label>
            </div>

            <div>
            <label>Title
                <input value={name} onChange={(e) => setName(e.target.value)} type='text'/>
            </label>
            </div>

            <div>
            <label>Price per Night
                <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type='text'/>
            </label>
            </div>

            <div>
            <label>Image URL
                <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} type='text'/>
            </label>
            </div>
            
            <div>
                <button type='submit'>Create Spot</button>
            </div>

        </form>
    )
}