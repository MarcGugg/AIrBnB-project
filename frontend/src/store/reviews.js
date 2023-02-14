import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'reviews/getSpotReview'

const getReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

export const getSpotReviews = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json()
        dispatch(getReviews(reviews))
    }
} 


const initialState = {
    spot: {},
    user: {}
}

export default function reviewsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = {...state, spot: {...state.spot}}

            newState.spot = action.reviews
            // console.log('newstate spot', newState.spot)
            return newState
        }
        default:
            return state
    }
}