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
    const [imageURL, setImageURL] = useState('') //only for preview image
    // const [otherImages, setOtherImages] = useState({})

    const [imageOne, setImageOne] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [imageThree, setImageThree] = useState('')
    const [imageFour, setImageFour] = useState('')

    const otherImagesObj = {
        imageOne,
        imageTwo,
        imageThree,
        imageFour
    }

    // if (Object.values(otherImagesObj).length) {
    //     console.log(otherImagesObj)
    //     setOtherImages(otherImagesObj)
    // }

    const spot = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        imageURL,
        otherImages:{
            ...otherImagesObj
        }
            
    }

    const dispatch = useDispatch()
    
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('spot', spot)

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

        
        // else {
            if (!validationErrors.length) {
                const newSpotObj = {...spot}
                newSpotObj.otherImages = {...spot.otherImages}
                const newSpot = await dispatch(createNewSpot(newSpotObj))
                // console.log('new spot',newSpot)
                history.push(`spots/${newSpot.id}`)
            }
        // }

    }
    
    console.log('errors', validationErrors)

    return (
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='banner'>Create a New Spot</div>
            <h1 className='locationHeader'>Where's your place located?</h1>
            <h3 className='locationCaption'>Guests will only get your exact address once they booked a reservation.</h3>
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
                <h4 className='priceCaption'>Competitive pricing can help your listing stand out and rank higher
in search results.</h4>
            <label className='pricePerNightStyling'>
                {'Price per night (USD)'}
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
                {/* preview iamge */}
                <h4 className='previewImageLabel'>Preview Image URL</h4>
                <input className='imageURLinput' value={imageURL} onChange={(e) => setImageURL(e.target.value)} type='text'/> 
                    
                <h4 className='imageLabel'>Image URL</h4>
                <input className='imageURLinput' value={imageOne} onChange={(e) => setImageOne(e.target.value)} type='text'/>
                
                <h4 className='imageLabel'>Image URL</h4>
                <input className='imageURLinput' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} type='text'/>
                
                <h4 className='imageLabel'>Image URL</h4>
                <input className='imageURLinput' value={imageThree} onChange={(e) => setImageThree(e.target.value)} type='text'/>
                
                <h4 className='imageLabel'>Image URL</h4>
                <input className='imageURLinput' value={imageFour} onChange={(e) => setImageFour(e.target.value)} type='text'/>
            </label>
            </div>
            
            <div className='submitButtonParent'>
                <button type='submit' className='submitButton'>Create Spot</button>
            </div>

        </form>
        </div>
    )
}