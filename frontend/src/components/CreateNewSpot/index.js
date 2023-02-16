import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';

import { createNewSpot } from '../../store/spots';
import './CreateNewSpot.css'

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
    
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('spot', spot)

        const errs = []

        // if (typeof spot.price !== 'number') {
        //     errs.push('price must be a number')
        //     setValidationErrors(errs)
        // } 
        // else {
            const newSpotObj = {...spot}
            const newSpot = await dispatch(createNewSpot(newSpotObj))
            // console.log('new spot',newSpot)
            history.push(`spots/${newSpot.id}`)
        // }

    }

    return (
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='country'>    
            <label>Country
            <input className='countryInput' value={country} onChange={(e) => setCountry(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='address'>
            <label>Street Address
            <input className='addressInput' value={address} onChange={(e) => setAddress(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='cityState'>
                <div className='cityDiv'>
            <label>City
            <input className='cityInput' value={city} onChange={(e) => setCity(e.target.value)} type='text'/>
            </label>
                </div>
                <div className='stateDiv'>
            <label>State
            <input className='stateInput' value={state} onChange={(e) => setState(e.target.value)} type='text'/>
            </label>
                </div>
            </div>

            <div className='description'>
                <h2>Describe your place to guests</h2>
                <h4>Mention the best features of your space, any special amentities like
fast wifi or parking, and what you love about the neighborhood.</h4>
            <label>
                <textarea className='descriptionInput' value={description} onChange={(e) => setDescription(e.target.value)} name='description'/>
            </label>
            </div>

            <div className='title'>
                <h2>Create a title for your spot</h2>
                <h4>Catch guests' attention with a spot title that highlights what makes
your place special.</h4>
            <label>
                <input className='titleInput' value={name} onChange={(e) => setName(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='price'>
                <h2>Set a base price for your spot</h2>
                <h4>Competitive pricing can help your listing stand out and rank higher
in search results.</h4>
            <label>
                <input className='priceInput' value={price} onChange={(e) => setPrice(Number(e.target.value))} type='text'/>
            </label>
            </div>

            <div className='imageURL'>
                <h2>Liven up your spot with photos</h2>
                <h4>Submit a link to at least one photo to publish your spot.</h4>
            <label>
                <input className='imageURLinput' value={imageURL} onChange={(e) => setImageURL(e.target.value)} type='text'/>
            </label>
            </div>
            
            <div className='submitButton'>
                <button type='submit'>Create Spot</button>
            </div>

        </form>
        </div>
    )
}