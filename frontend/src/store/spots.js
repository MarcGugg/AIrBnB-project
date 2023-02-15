import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SINGLE_SPOT = 'spots/getOneSpot'
const CREATE_SPOT = 'spots/createSpot'
const GET_USER_SPOTS = 'spots/getUserSpots'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'

const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const oneSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}

const createSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

const userSpots = (currUserSpots) => {
    return {
        type: GET_USER_SPOTS,
        currUserSpots
    }
}

const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const removeSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const spotsObj = await res.json()
        // const spots = Object.values(spotsObj)
        dispatch(loadSpots(spotsObj))
        // return spotsObj
    }
}

export const getUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
        const currUserSpots = await res.json()
        dispatch(userSpots(currUserSpots))
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = res.json()
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    console.log('res', res)
    if (res.ok) {
        const spot = await res.json()
        // spot.reviews = dispatch(getSpotReviews(spot.id))
        dispatch(oneSpot(spot))
    }
}

export const associateImageToSpot = (newSpotDetails, newSpotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${newSpotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "url": newSpotDetails.imageURL,
            "preview": true
        })
    })

    if (res.ok) {
        dispatch(getSingleSpot(newSpotId))
        newSpotDetails.avgRating = 0
        newSpotDetails.previewImage = newSpotDetails.imageURL
        dispatch(createSpot(newSpotDetails))
        // return newSpotDetails
    }
}

export const createNewSpot = (newSpotDetails) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newSpotDetails)
    })

    //csrf fetch to associate image

    if (res.ok) {
        const newSpot = await res.json()
        dispatch(associateImageToSpot(newSpotDetails, newSpot.id))
        // dispatch(createSpot(newSpot))
    }


}

export const updateSpot = (spotDetails, imageURL, spotId) => async (dispatch) => {
    // console.log('spot details $$$$', spotDetails)
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotDetails)
    })

    if (res.ok) {
        const updatedSpot = await res.json()
        console.log('updated spot', updatedSpot)
        // updatedSpot.imageURL = imageURL
        dispatch(editSpot(updatedSpot))
    }

}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(removeSpot(spotId))
    }
}

let initialState = {
    allSpots: {},
    singleSpot: {},
    userSpots: {}
}
export default function spotsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state, allSpots: {}}
            action.spots.Spots.map((spot) => {newState.allSpots[spot.id] = spot})
            // newState.allSpots = action.spots.Spots
            return newState
        }
        case GET_SINGLE_SPOT: {
            const newState2 = {...state}
            newState2.singleSpot = {...action.spot}
            return newState2
        }
        case CREATE_SPOT: {
            const newState3 = {...state, allSpots: {...state.allSpots}}
            newState3.allSpots[action.newSpot.id] = action.newSpot
            return newState3
        }
        case GET_USER_SPOTS: {
            const newState4 = {...state, userSpots: {...state.userSpots}}
            newState4.userSpots = {}
            action.currUserSpots.Spots.map(spot => newState4.userSpots[spot.id] = spot)
            return newState4
        }
        case UPDATE_SPOT: {
            const newState5 = {...state, userSpots: {...state.userSpots}}
            newState5.userSpots[action.spot.id] = {...action.spot}
            return newState5
        }
        case DELETE_SPOT: {
            const newState6 = {...state, allSpots: {}, userSpots: {...state.userSpots}} //...state.allSpots
            
            delete newState6.allSpots[action.spotId]
            delete newState6.userSpots[action.spotId]

            return newState6
        }
        default:
            return state
    }
}