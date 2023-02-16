import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'reviews/getSpotReview'
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'

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

const updateReview = (updatedReview) => {
    return {
        type: EDIT_REVIEW,
        updatedReview
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

export const postReview = (review, user, spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "review": review.review,
            "stars": review.stars
        })
    })

    if (res.ok) {
        const review = await res.json()
        console.log('review thunk', review)
        review.User = user
        await dispatch(createReview(review))
        return review
    }
}

export const editReview = (reviewDetails, user, reviewId) => async (dispatch) => {
    console.log('review details', reviewDetails)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "review": reviewDetails.review,
            "stars": reviewDetails.stars
        })
    })

    if (res.ok) {
        const updatedReview = await res.json()
        console.log('thunk res hit. UPDATED REVIEW: ', updatedReview)
        updatedReview.User = user
        dispatch(updateReview(updatedReview))
        return updatedReview
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
            // console.log('action reviews AAAA', action.reviews)
            newState.spot = {...action.reviews}
            // console.log('newstate spot', newState.spot)
            return newState
        }
        case CREATE_REVIEW: {
            const newState2 = {...state, spot: {...state.spot}, spot: {Reviews: [...state.spot.Reviews]}} //...state.spot
            newState2.spot.Reviews.push(action.review)
            return newState2
        }
        case EDIT_REVIEW: {
            const newState3 = {...state, spot: {...state.spot}, spot: {Reviews: [...state.spot.Reviews]}}
            console.log('newstate reviews', newState3.spot.Reviews)
            console.log('action review', action.updatedReview.review)
            // newState3.spot.Reviews[action.updatedReview.id] = {...action.updatedReview}
            // newState3.spot.Reviews[action.updatedReview.id].stars = {...action.updatedReview.stars}
            return newState3
        }
        default:
            return state
    }
}