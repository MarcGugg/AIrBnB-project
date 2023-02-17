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

    // // console.log('spot', spot)
    // let spotToEdit
    // useEffect( async () => {
    //    spotToEdit = dispatch(getSingleSpot(spotId))   
    // }, [dispatch])
    
    // console.log('spotToEdit', spotToEdit)
    
    
    const [validationErrors, setValidationErrors] = useState([])
    const [country, setCountry] = useState(spot.country || '')
    const [address, setAddress] = useState(spot.address || '')
    const [city, setCity] = useState(spot.city || '')
    const [state, setState] = useState(spot.state || '')
    const [description, setDescription] = useState(spot.description || '')
    const [name, setName] = useState(spot.name || '')
    const [price, setPrice] = useState(spot.price || '')
    const [imageURL, setImageURL] = useState(spot.imageURL || '')


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
        
        if (typeof updatedSpotDetails.price !== 'number') {
            errs.push('price must be a number')
            setValidationErrors(errs)
        } else {
            const spotDetails = {...updatedSpotDetails}
            // console.log('spot', spotDetails)
            // return null
            dispatch(updateSpot(spotDetails, imageURL, spotId))
            history.push(`/spots/current`)
        }

    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <div>    
        //     <label>Country
        //     <input value={country} onChange={(e) => setCountry(e.target.value)} type='text'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>Street Address
        //     <input value={address} onChange={(e) => setAddress(e.target.value)} type='text'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>City
        //     <input value={city} onChange={(e) => setCity(e.target.value)} type='text'/>
        //     </label>
        //     <label>State
        //     <input value={state} onChange={(e) => setState(e.target.value)} type='text'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>Description
        //         <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>Title
        //         <input value={name} onChange={(e) => setName(e.target.value)} type='text'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>Price per Night
        //         <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type='text'/>
        //     </label>
        //     </div>

        //     <div>
        //     <label>Image URL
        //         <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} type='text'/>
        //     </label>
        //     </div>
            
        //     <div>
        //         <button type='submit'>Update Spot</button>
        //     </div>

        // </form>
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
                <button type='submit'>Update Spot</button>
            </div>

        </form>
        </div>
    )
}