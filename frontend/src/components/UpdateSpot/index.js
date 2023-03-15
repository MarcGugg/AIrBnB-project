import React from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot, updateSpot } from '../../store/spots';

// import 

export default function UpdateSpot() {
    const spot = useSelector((state) => state.spots.singleSpot)

    const dispatch = useDispatch()

    const {spotId} = useParams()

    // console.log('spotId',spotId)
    const [validationErrors, setValidationErrors] = useState([])
    const [country, setCountry] = useState(spot.country || '')
    const [address, setAddress] = useState(spot.address || '')
    const [city, setCity] = useState(spot.city || '')
    const [state, setState] = useState(spot.state || '')
    const [description, setDescription] = useState(spot.description || '')
    const [name, setName] = useState(spot.name || '')
    const [price, setPrice] = useState(spot.price || '')
    const [imageURL, setImageURL] = useState('')

    // console.log('spot', spot)
    // let spotToEdit
    useEffect(() => {
       dispatch(getSingleSpot(spotId))   
    }, [dispatch])
    
    useEffect(() => {
        if (Object.values(spot).length) {
            setCountry(spot.country)
            setCity(spot.city)
            setState(spot.state)
            setAddress(spot.address)
            setDescription(spot.description)
            setName(spot.name)
            setImageURL(spot.SpotImages[0].url)
            setPrice(spot.price)
        } 
    }, [spot])
    // console.log('spotToEdit', spotToEdit)
    
    

    // console.log('spotId',spotId)



    const history = useHistory()

    const updatedSpotDetails = {
        country,
        address,
        city,
        state,
        description,
        name,
        price
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const errs = []

        if (typeof spot.price !== 'number') errs.push('Price must be a number')
        if (!price) errs.push('Price is required')
        if (!country.length) errs.push('Country is required')
        if (!address.length) errs.push('Address is required')
        if (!city.length) errs.push('City is required')
        if (!state.length) errs.push('State is required')
        if (!description.length) errs.push('Description is required')
        if (!name.length) errs.push('Title is required')
        setValidationErrors(errs)
        
        // if (typeof updatedSpotDetails.price !== 'number') {
        //     errs.push('price must be a number')
        //     setValidationErrors(errs)
        // } 
        // else {
        //     const spotDetails = {...updatedSpotDetails}
        //     // console.log('spot', spotDetails)
        //     // return null
        //     dispatch(updateSpot(spotDetails, imageURL, spotId))
        //     history.push(`/spots/${spotId}`)
        // }

        if (!validationErrors.length) {
            const spotDetails = {...updatedSpotDetails}
            // console.log('spot', spotDetails)
            // return null
            dispatch(updateSpot(spotDetails, imageURL, spotId))
            history.push(`/spots/${spotId}`)
        }

    }

    if (!Object.values(spot).length) return null

    console.log('errors', validationErrors)
    
    return (
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='country'>    
            <label>Country
            <p>
                    {validationErrors.length > 0 ? <p className='error'>
                        {'Country is required'}
                    </p> : ''}
                </p>
            <input className='countryInput' value={country} onChange={(e) => setCountry(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='address'>
            <label>Street Address
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'Address is required'}
                   </p>: ''} 
                </p>
            <input className='addressInput' value={address} onChange={(e) => setAddress(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='cityState'>
                <div className='cityDiv'>
            <label>City
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'City is required'}
                   </p>: ''} 
                </p>
            <input className='cityInput' value={city} onChange={(e) => setCity(e.target.value)} type='text'/>
            </label>
                </div>
                <div className='stateDiv'>
            <label>State
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'State is required'}
                   </p>: ''} 
                </p>
            <input className='stateInput' value={state} onChange={(e) => setState(e.target.value)} type='text'/>
            </label>
                </div>
            </div>

            <div className='description'>
                <h2>Describe your place to guests</h2>
                <h4>Mention the best features of your space, any special amentities like
fast wifi or parking, and what you love about the neighborhood.</h4>
            <label>
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'Description is required'}
                   </p>: ''} 
                </p>
                <textarea className='descriptionInput' value={description} onChange={(e) => setDescription(e.target.value)} name='description'/>
            </label>
            </div>

            <div className='title'>
                <h2>Create a title for your spot</h2>
                <h4>Catch guests' attention with a spot title that highlights what makes
your place special.</h4>
            <label>
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'Title is required'}
                   </p>: ''} 
                </p>
                <input className='titleInput' value={name} onChange={(e) => setName(e.target.value)} type='text'/>
            </label>
            </div>

            <div className='price'>
                <h2>Set a base price for your spot</h2>
                <h4>Competitive pricing can help your listing stand out and rank higher
in search results.</h4>
            <label>
            <p>
                   {validationErrors.length > 0 ? <p className='error'>
                    {'Price is required'}
                   </p>: ''}
                   {price === NaN ? <p>
                    {'Price must be a number'}
                   </p>: ''} 
                </p>
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
            
            <div className='submitButtonParent'>
                <button type='submit' className='submitButton'>Update Spot</button>
            </div>

        </form>
        </div>
    )
}