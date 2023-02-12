import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SINGLE_SPOT = 'spots/getOneSpot'

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


let initialState = {
    allSpots: {},
    singleSpot: {}
}
export default function spotsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state}
            action.spots.Spots.map((spot) => {newState.allSpots[spot.id] = spot})
            return newState
        }
        case GET_SINGLE_SPOT: {
            const newState2 = {...state}
            newState2.singleSpot = {...action.spot}
            return newState2
        }
        default:
            return state
    }
}