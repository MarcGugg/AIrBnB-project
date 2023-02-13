import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SINGLE_SPOT = 'spots/getOneSpot'
const CREATE_SPOT = 'spots/createSpot'


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


export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const spotsObj = await res.json()
        // const spots = Object.values(spotsObj)
        dispatch(loadSpots(spotsObj))
        // return spotsObj
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    
    if (res.ok) {
        const spot = await res.json()
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


let initialState = {
    allSpots: {},
    singleSpot: {}
}
export default function spotsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state}
            // action.spots.Spots.map((spot) => {newState.allSpots[spot.id] = spot})
            newState.allSpots = action.spots.Spots
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
        default:
            return state
    }
}