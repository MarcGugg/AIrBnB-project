import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getAllSpots'

const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
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
        default:
            return state
    }
}