import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'reviews/getSpotReview'
const CREATE_REVIEW = 'reviews/createReview'

const getReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const getSpotReviews = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    // console.log('thunk hit')
    if (res.ok) {
        const reviews = await res.json()
        console.log('reviews thunk', reviews)
        dispatch(getReviews(reviews))
    }
} 

export const postReview = (review, spotId) => async(dispatch) => {
    const res = csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "review": review.review,
            "stars": review.stars
        })
    })

    if (res.ok) {
        const review = await res.json()
        await dispatch(createReview(review))
        return review
    }
}


const initialState = {
    spot: {},
    user: {}
}

export default function reviewsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = {...state, spot: {}}
            // console.log('action reviews', action.reviews)
            newState.spot = action.reviews
            // console.log('newstate spot', newState.spot)
            return newState
        }
        case CREATE_REVIEW: {
            const newState2 = {...state, spot: {...state.spot}}
            newState2.spot[action.review.id] = action.review
            return newState2
        }
        default:
            return state
    }
}